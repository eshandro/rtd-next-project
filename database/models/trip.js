const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const StopTimeSchema = require('./stop_time');

const TripSchema = new Schema ({
	trip_id: String,
	// MT = Monday - Thursday, FR = Friday, SA = Saturday, SU = Sunday
	day: String, // service_id in trips.json
	route_id: String,
	direction: Number,
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