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
-route_type = 2 incluedes 2 lines -- A,B
*/

/*

First step is to filter trips.json to only light rail related trips.
Then, we can filter stop_times to only include trip_ids that are in filtered light rail trips.
Then, we can filter stops to on include stop_ids that are in filtered stop_times.

 */
const StreamFilteredArray = require("stream-json/utils/StreamFilteredArray"),
		fs = require('fs');

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

// const stream = StreamFilteredArray.make({objectFilter: tripsFilter}),
// 		file = fs.createWriteStream(__dirname + "/../feed/json/trips-lr.json");

let 	trip_ids = [],
		stop_ids = [];

// stream.output.on("data", function(object){
// 	// console.log(object.index, object.value.route_id);
// 	if (counter === 0) {
// 		file.write('[\n\t')
// 	} else {
// 		if (counter > 1) {
// 			file.write(",\n\t")
// 		} else {
// 			file.write("\n\t")
// 		}
// 	}
// 	file.write(JSON.stringify(object.value));
// 	if(!trip_ids.includes(object.value.trip_id)) trip_ids.push(object.value.trip_id)
// 	counter++;
// });
// stream.output.on("end", function(){
// 	file.write("\n]");
// 	counter = 0;
// 	createLRStopTimes();
// });

// fs.createReadStream(__dirname + "/../feed/json/trips.json").pipe(stream.input);

function createLRStopTimes() {
	const stream2 = StreamFilteredArray.make({objectFilter: stopTimesFilter}),
			file2 = fs.createWriteStream(__dirname + "/../feed/json/stop_times-lr.json");
	fs.createReadStream(__dirname + "/../feed/json/stop_times.json").pipe(stream2.input);
	stream2.output.on("data", function(object){
		// console.log(object.index, object.value.route_id);
		if (counter === 0) {
			file2.write('[\n\t')
		} else {
			if (counter > 1) {
				file2.write(",\n\t")
			} else {
				file2.write("\n\t")
			}
		}
		file2.write(JSON.stringify(object.value));
		if(!stop_ids.includes(object.value.stop_id)) stop_ids.push(object.value.stop_id)
		counter++;
	});
	stream2.output.on("end", function(){
		file2.write("\n]");
		counter = 0;
		createLRStops();
	});	
}

function createLRStops() {
	const stream3 = StreamFilteredArray.make({objectFilter: stopTimesFilter}),
			file3 = fs.createWriteStream(__dirname + "/../feed/json/stops-lr.json");
	fs.createReadStream(__dirname + "/../feed/json/stops.json").pipe(stream3.input);
	stream3.output.on("data", function(object){
		// console.log(object.index, object.value.route_id);
		if (counter === 0) {
			file3.write('[\n\t')
		} else {
			if (counter > 1) {
				file3.write(",\n\t")
			} else {
				file3.write("\n\t")
			}
		}
		file3.write(JSON.stringify(object.value));
		counter++;
	});
	stream3.output.on("end", function(){
		file3.write("\n]");
	});	
}

function createLRJson(sourceFile, outputFile, filterFN, list, testKey) {
	const stream = StreamFilteredArray.make({objectFilter: filterFN}),
			file = fs.createWriteStream(__dirname + "/../feed/json/" + outputFile);
			let counter = 0, counter2 = 0;
	console.log("list start fn",list);
	console.log("testKey ",testKey);
	console.log("stop_ids.length ",stop_ids.length);
	console.log("trip_ids.length ",trip_ids.length);

	let read = fs.createReadStream(__dirname + "/../feed/json/" + sourceFile);
	read.pipe(stream.input);
	read.on('end', ()=> console.log("read ends"))
	return new Promise((resolve,reject) => {
		stream.output
			.on("data", function(object){
			// if (counter %1000 == 0) console.log("object.index", object.index, "object.value.testKey",object.value.route_id);
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
		.on("end", function(){
			file.write("\n]");
			counter = 0;
			file.end();
			read.unpipe();
			console.log("stream.output ends");
			resolve({lrJsonSuccess: true, data:`Done writing ${outputFile}`})
		});
		stream.input
			.on('data', () => {
				if(counter2 < 1) console.log('stream.input data event');
				counter2++;
			})
			.on('end', () => {
				console.log("stream.input ends")
			})

	})
	.then((data) => {
		// console.log("data ",data);
		return data;
	}, (err) => {
		return Promise.reject({lrJsonSuccess: false, data: err});
	})
}

const lrJson = createLRJson('trips.json','trips-lr.json',tripsFilter, trip_ids,'trip_id');
lrJson
	.then((data) => {
		console.log("data 1 lrJson ",data);
		return createLRJson('stop_times.json', 'stop_times-lr.json',stopTimesFilter,stop_ids,'stop_id');
	})
	.then((data) => {
		console.log("data 2 lrJson ",data);
		return createLRJson('stops.json', 'stops-lr.json',stopsFilter,false,false);
	})
	.then((data) => {
		console.log("data 3 lrJson ",data);
		console.log("lrJson done");
	})
	.catch((err) => {
		console.log("lrJson err", err)
	})


