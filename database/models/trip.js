const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const StopTimeSchema = require('./stop_time');

const TripSchema = new Schema ({
	trip_id: String,
	day: String, // service_id in trips.json
	route_id: String,
	direction: String,
	headsign: String,
	// stop_times: [StopTimeSchema]
	stop_times: [{
		type: Schema.Types.ObjectId,
		ref: 'stoptime'
	}]

});

const Trip = mongoose.model('trip', TripSchema)

// module.exports = TripSchema;
module.exports = Trip;