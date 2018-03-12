const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StopTimeSchema = require('./stop_time');

const TripSchema = new Schema ({
	id: String,
	day: String, // service_id in trips.json
	route_id: String,
	direction: String,
	headsign: String
	stop_times: [StopTimeSchema]
});

// const Trip = mongoose.model('trip', TripSchema)

module.exports = TripSchema;