const StopTime = require('../../../database/models/stop_time');
const dateHelpers = require('../dateHelpers');
/** json obj **/
// {"trip_id":"111674563"
// "arrival_time":"06:43:00"
// "departure_time":"06:43:00"
// "stop_id":"34560"
// "stop_sequence":"1"
// "stop_headsign":""
// "pickup_type":"0"
// "drop_off_type":"1"
// "shape_dist_traveled":"0"}


/** StopTime Schema: **/
// time: String,
// stop_id: Number,
// trip_id: Number,
// stop_sequence: Number,
// pickup_type: Number

function createStopTime(json) {
	let newStopTime = new StopTime ({
		time: dateHelpers.convertRTDTimeTo24(json.arrival_time),
		stop_id: json.stop_id,
		trip_id: json.trip_id,
		stop_sequence: json.stop_sequence,
		pickup_type: json.pickup_type 
	});
	return newStopTime;
}

module.exports = createStopTime;