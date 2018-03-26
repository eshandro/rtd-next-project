const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const geoPointSchema = require('./geoPointSchema');

const StopSchema = new Schema ({
	stop_id: String,
	name: String,
	desc: String,
	// direction: String,
	lat: Number,
	lng: Number,
	// lng, lat in coordinates
	location: geoPointSchema,
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