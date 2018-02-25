const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StopTimeSchema = require('./stop_time');
const TripSchema = require('./trip')

const StopSchema = new Schema ({
	id: String,
	name: String,
	desc: String,
	lat: Number,
	long: Number,
	// stop_times: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'stop_time'
	// }]
	stop_times: [StopTimeSchema],
	trips: [TripSchema]
});

const Stop = mongoose.model('stop', StopSchema)

module.exports = Stop;