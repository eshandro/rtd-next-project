const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const StopSchema = require('./stop');
// const TripSchema = require('./trip');

const RouteSchema = new Schema ({
	route_id: String,
	name: String,
	shortName: String,
	desc: String,
	directions: [],
	stops: [{
		type: Schema.Types.ObjectId,
		ref: 'stop'
	}],
	// trips: [TripSchema]
	trips: [{
		type: Schema.Types.ObjectId,
		ref: 'trip'
	}]
});

const Route = mongoose.model('route', RouteSchema)

module.exports = Route;