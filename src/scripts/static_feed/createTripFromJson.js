const Trip = require('../../../database/models/trip');
/** json obj **/
// route_id
// service_id
// trip_id
// trip_headsign
// direction_id
// block_id
// shape_id

/** Trip Schema: **/
// trip_id: String,
// day: String, // service_id in trips.json
// route_id: String,
// direction: String,
// headsign: String,
// stop_times: [StopTimeSchema]

function createTrip(json) {
	let newTrip = new Trip ({
		trip_id: json.trip_id,
		day: json.service_id,
		route_id: json.route_id,
		direction: json.direction_id,
		headsign: json.trip_headsign,
		stop_times: []
	});
	return newTrip;
}

module.exports = createTrip;