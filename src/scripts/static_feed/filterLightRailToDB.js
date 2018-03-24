/* 
Static Feed Light Rail Info:
-route_id = 101 + rail line for C, D, E, F, H, e.g. 101C
-route_id = 103W  for W line
-route_id = A for A-line to airport
-route_id = 113B for B Line
-route_id = 107R for R Line
-route_id = 109L for L Line (new line starting 1/4/18 - affects D Line; D Line will stop at 18th and the L Line will 
				be a seperate line that takes over the D Line's 18th & Stout to 30th and Downing stretch. The L Line will 
				also do a loop 14th - 19th on California and on Stout. Stops will be at 16th & 18th at the existing stops 
				for the D, F, H Lines. The L Line will eventually connect up to the A Line at 38th and Downing.)

1/2018 10 light rail lines
-route_type = 0 includes 8 lines -- C,D,E,F,H,L,R,W
-route_type = 2 includes 2 lines -- A,B
*/

/*

First step is to filter trips.json to only light rail related trips.
Then, we can filter stop_times to only include trip_ids that are in filtered light rail trips.
Then, we can filter stops to on include stop_ids that are in filtered stop_times.

 */
const StreamFilteredArray = require("stream-json/utils/StreamFilteredArray"),
		fs = require('fs'),

		createTripFromJson = require("./createTripFromJson"),
		globals = require('../globals');


/**
	Helper Functions:
	Filter functions used by StreamFilteredArray
**/
function tripsFilter(assembler) {
	// test only top-level objects in the array:
	if(assembler.stack.length == 2 && assembler.key === null){
		if(assembler.current.hasOwnProperty("route_id")){
			// "true" to accept, "false" to reject
			return /101.|103W|^A$|107R|113B|109L/.test(assembler.current.route_id);
		}
	}
  // return undefined to indicate our uncertainty at this moment
}

function stopTimesFilter(assembler) {
	if(assembler.stack.length == 2 && assembler.key === null){
		if(assembler.current.hasOwnProperty("trip_id")){
			// "true" to accept, "false" to reject
			return trip_ids.includes(assembler.current.trip_id);
		}
	}
  // return undefined to indicate our uncertainty at this moment
}

function stopsFilter(assembler) {
	if(assembler.stack.length == 2 && assembler.key === null){
		if(assembler.current.hasOwnProperty("stop_id")){
			// "true" to accept, "false" to reject
			return stop_ids.includes(assembler.current.stop_id);
		}
	}
  // return undefined to indicate our uncertainty at this moment
}

let 	trip_ids = [],
		stop_ids = [];

/**
 * create Light Rail only JSON files
 * @param  {string} sourceFile File to be stripped to lightrail only info
 * @param  {function} filterFN Filter function used to filter lightrail only info (see above helper functions)
 * @param  {array} list        List of relevant ids used for filtering
 * @param  {string} testKey    Key used to add to relevant list
 * @return {promise}           object {lightRailDataSuccess: boolean, data: string}
 *                                    lightRailDataSuccess used to determine next step
 *                                    data: error or path to newly create filtered JSON file
 */

function addLightRailData(sourceFile, filterFN, list, testKey) {
	const stream = StreamFilteredArray.make({objectFilter: filterFN});
	// REWRITE: May no longer need counter
	let counter = 0;
	
	return new Promise((resolve,reject) => {
		const errorHandlerRead = (error) => {
			console.log("errorHandlerRead in addLightRailData promise");
			let errMsg = `Unable to read file ${globals.extractedFolder}/json/${sourceFile}:  ${error}`;
			reject(errMsg);
		};

		let read = fs.createReadStream(globals.extractedFolder + "/json/" + sourceFile);
		read.pipe(stream.input);
		
		read.on('error', errorHandlerRead);

		stream.input
			.on('error', errorHandlerRead)

		stream.output
			.on("data", function(object){
				// REWRITE No longer writing to file
				// if (counter === 0) {
				// 	file.write('[\n\t')
				// } else {
				// 	if (counter >= 1) {
				// 		file.write(",\n\t")
				// 	} else {
				// 		file.write("\n\t")
				// 	}
				// }
				// file.write(JSON.stringify(object.value));
				if (counter < 5) console.log('object.value in stream.output from ' + sourceFile, object.value);
				if(list && testKey) {
					if(!list.includes(object.value[testKey])) {
						list.push(object.value[testKey])
					};
				}
				counter++;
			})
			.on("error", errorHandlerRead)
			.on("end", function(){
				// REWRITE
				// file.write("\n]");
				// counter = 0;
				// file.end();
				read.unpipe();
				// console.log("stream.output ends");
				// REWRITE: Change data to sourceFile from outputFile
				resolve({lightRailDataSuccess: true, data:sourceFile})
			});
		// REWRITE
		// file
		// 	.on("error", errorHandlerWrite)
			// .on("close", () => {console.log('file end')})

	})
	.then((data) => {
		return data;
	}, (err) => {
		// file.end();
		// if(read) read.unpipe();
		console.log('err in addLightRailData', err);
		return Promise.reject({lightRailDataSuccess: false, data: err});
	})
}

/**
 * Function that controls the order of lightrail filtering
 * First, filter routes.json without affecting any other lists
 * Then, filter trips.json to only light rail related trips.
 *	Then, we can filter stop_times to only include trip_ids that are in filtered light rail trips.
 *	Then, we can filter stops to on include stop_ids that are in filtered stop_times
 * @return {promise} object {lightRailDataSuccess: boolean, data: array}
 *                          lightRailDataSuccess: used to determine next step
 *                          data: list of newly filtered lightrail files
 */
function filterLightRail() {
	const lightRailData = addLightRailData('routes.json',tripsFilter,false,false);

	let t1 = Date.now(), filesFiltered = [];
	return lightRailData
		.then((data) => {
			console.log("data 1 ",data);
			filesFiltered.push(data.data);
			return addLightRailData('trips.json',tripsFilter,trip_ids,'trip_id');
		})
		.then((data) => {
			console.log("data 2 ",data);
			filesFiltered.push(data.data);
			return addLightRailData('stop_times.json',stopTimesFilter,stop_ids,'stop_id');
		})
		.then((data) => {
			console.log("data 3 ",data);
			filesFiltered.push(data.data);
			return addLightRailData('stops.json',stopsFilter,false,false);
		})
		.then((data) => {
			filesFiltered.push(data.data);
			let 	t2 = Date.now(),
					totalTime = t2-t1,
					d = new Date(totalTime);
			console.log("filterLightRail took " + d.getUTCMinutes() + ' mins & ' + d.getUTCSeconds() + ' seconds');
			return ({lightRailDataSuccess: data.lightRailDataSuccess, data: filesFiltered});
		})
		.catch((err) => {
			console.log("lightRailData err", err);
			return err;
		})
}

// Testing only
// filterLightRail();
module.exports = filterLightRail;
