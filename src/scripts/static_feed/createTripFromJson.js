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
// id: String,
// day: String, // service_id in trips.json
// route_id: String,
// direction: String,
// headsign: String,
// stop_times: [StopTimeSchema]

function createTrip(json) {


}

module.exports = createTrip;