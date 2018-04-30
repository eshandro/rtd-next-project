const Trip = require('../../../database/models/trip');
/** json obj **/
// "block_id": "b_109  8",
// "route_id": "109L",
// "direction_id": "1",
// "trip_headsign": "L-Line 16th & Stout",
// "shape_id": "1065555",
// "service_id": "SA_merged_112042909",
// "trip_id": "111972212"

/** Trip Schema: **/
// trip_id: String,
// service_id: String,
// route_id: String,
// direction_id: String,
// headsign: String,
// stop_times: [{
// 	type: Schema.Types.ObjectId,
// 	ref: 'stop_time'
// }]

function createTrip(json) {
	let newTrip = new Trip ({
		trip_id: json.trip_id,
		service_id: json.service_id,
		route_id: json.route_id,
		direction_id: json.direction_id,
		headsign: json.trip_headsign,
		block_id: json.block_id,
		stop_times: []
	});
	return newTrip;
}

module.exports = createTrip;