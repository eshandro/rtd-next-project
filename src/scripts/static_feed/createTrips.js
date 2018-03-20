const Trip = require('../../../database/models/trip'),
		StreamArray = require("stream-json/utils/StreamArray"),
		fs = require('fs');

// Trip Schema:
// id: String,
// day: String, // service_id in trips.json
// route_id: String,
// direction: String,
// headsign: String,
// stop_times: [StopTimeSchema]

function createTrips(fname) {
	let stream = StreamArray.make();
	console.log("createTrips called ");

	stream.output.on("data", function(object){
		if (object.index < 5) console.log(object.index, object.value);
	});
	stream.output.on("end", function(){
		console.log("done");
	});
	 
	fs.createReadStream(fname).pipe(stream.input);

}

module.exports = createTrips;