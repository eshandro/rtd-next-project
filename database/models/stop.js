const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const StopTimeSchema = require('./stop_time');
// const TripSchema = require('./trip');

const StopSchema = new Schema ({
	stop_id: Number,
	name: String,
	desc: String,
	// direction: String,
	lat: Number,
	long: Number,
	stop_times: [{
		type: Schema.Types.ObjectId,
		ref: 'stop_time'
	}],
	// stop_times: [StopTimeSchema],
	// trips: [TripSchema]
	trips: [{
		type: Schema.Types.ObjectId,
		ref: 'trip'
	}]
});

const Stop = mongoose.model('stop', StopSchema)

module.exports = Stop;