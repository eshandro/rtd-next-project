const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note not sure how to determine direction, maybe need to utilize trips?
const TripSchema = new Schema ({
	id: String,
	day: String, // service_id in trips.json
	route_id: String,
	direction: String,
	headsign: String
});

// const Trip = mongoose.model('trip', StopSchema)

module.exports = Trip;