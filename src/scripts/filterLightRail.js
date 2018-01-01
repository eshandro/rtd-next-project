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
		fs = require('fs');


/**
	Filter functions
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

function createLRJson(sourceFile, outputFile, filterFN, list, testKey) {
	const stream = StreamFilteredArray.make({objectFilter: filterFN}),
			file = fs.createWriteStream(__dirname + "/../feed/json/" + outputFile);
			let counter = 0;
	
	return new Promise((resolve,reject) => {
		const errorHandlerRead = (error) => {
			console.log("errorHandlerRead in createLRJson promise");
			let errMsg = `Unable to read file ${__dirname}/../feed/json/${sourceFile}:  ${error}`;
			reject(errMsg);
		};			
		const errorHandlerWrite = (error) => {
			console.log("errorHandlerWrite in createLRJson promise");
			let errMsg = `Unable to write file ${__dirname}/../feed/json/${outputFile}:  ${error}`;
			reject(errMsg);
		};

		let read = fs.createReadStream(__dirname + "/../feed/json/" + sourceFile);
		read.pipe(stream.input);
		read.on('error', errorHandlerRead);
		read.on('end', ()=> {console.log("read ends")});

		stream.input
			.on('error', errorHandlerRead)
			.on('end', () => {
				console.log("stream.input ends")
			})
		stream.output
			.on("data", function(object){
			if (counter === 0) {
				file.write('[\n\t')
			} else {
				if (counter >= 1) {
					file.write(",\n\t")
				} else {
					file.write("\n\t")
				}
			}
			file.write(JSON.stringify(object.value));
			if(list && testKey) {
				if(!list.includes(object.value[testKey])) {
					list.push(object.value[testKey])
				};
			}
			counter++;
		})
		.on("error", errorHandlerRead)
		.on("end", function(){
			file.write("\n]");
			counter = 0;
			file.end();
			read.unpipe();
			console.log("stream.output ends");
			resolve({lrJsonSuccess: true, data:outputFile})
		});

		file
			.on("error", errorHandlerWrite)
			.on("close", () => {console.log('file end')})

	})
	.then((data) => {
		return data;
	}, (err) => {
		file.end();
		// if(read) read.unpipe();
		console.log('err in createLRJson', err);
		return Promise.reject({lrJsonSuccess: false, data: err});
	})
}

function filterLightRail() {
	const lrJson = createLRJson('trips.json','trips-lr.json',tripsFilter, trip_ids,'trip_id');

	let t1 = Date.now(), filesFiltered = [];
	return lrJson
		.then((data) => {
			console.log("data 1 lrJson ",data);
			filesFiltered.push(data.data);
			return createLRJson('stop_times.json', 'stop_times-lr.json',stopTimesFilter,stop_ids,'stop_id');
		})
		.then((data) => {
			console.log("data 2 lrJson ",data);
			filesFiltered.push(data.data);
			return createLRJson('stops.json', 'stops-lr.json',stopsFilter,false,false);
		})
		.then((data) => {
			console.log("data 3 lrJson ",data);
			filesFiltered.push(data.data);
			let 	t2 = Date.now(),
					totalTime = t2-t1,
					d = new Date(totalTime);
			console.log("filterLightRail took " + d.getUTCMinutes() + ' mins & ' + d.getUTCSeconds() + ' seconds');
			console.log("lrJson done");
			return ({lrJsonSuccess: data.lrJsonSuccess, data: filesFiltered});
		})
		.catch((err) => {
			console.log("lrJson err", err);
			return err;
		})
}

// Testing only
// filterLightRail();
module.exports = filterLightRail;