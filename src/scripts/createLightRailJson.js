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
Then, we can filter stop_times to only include trips that are in filtered light rail trips.
Then, we can filter stops to on include stops that are in filtered stop_times.

 */
const StreamFilteredArray = require("stream-json/utils/StreamFilteredArray"),
		fs = require('fs');

function tripsFilter(assembler){
	// console.log("tripsFilter called");
	// test only top-level objects in the array:
	if(assembler.stack.length == 2 && assembler.key === null){
		// console.log("assembler.stack.length == 2 && assembler.key === null is true");

		if(assembler.current.hasOwnProperty("route_id")){
			// console.log("assembler.current.hasOwnProperty('route_id') is true");
			// "true" to accept, "false" to reject
			// console.log("/101.|103W|A|107R|113B|109L/.test(assembler.current.route_id) ",/101.|103W|A|107R|113B|109L/.test(assembler.current.route_id));
			return /101.|103W|^A$|107R|113B|109L/.test(assembler.current.route_id);
		}
	}
  // return undefined to indicate our uncertainty at this moment
}

const stream = StreamFilteredArray.make({objectFilter: tripsFilter}),
		file = fs.createWriteStream(__dirname + "/../feed/json/trips-lr.json");

let counter = 0;

stream.output.on("data", function(object){
	// console.log(object.index, object.value.route_id);
	if (counter === 0) {
		file.write('[\n\t')
	} else {
		if (counter > 1) {
			file.write(",\n\t")
		} else {
			file.write("\n\t")
		}
	}
	file.write(JSON.stringify(object.value));
	counter++;
});
stream.output.on("end", function(){
	file.write("\n]");
	console.log("done");
});

fs.createReadStream(__dirname + "/../feed/json/trips.json").pipe(stream.input);

