const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const StopSchema = require('./stop');
const TripSchema = require('./trip');

const RouteSchema = new Schema ({
	id: String,
	name: String,
	shortName: String,
	desc: String,
	stops: [{
		type: Schema.Types.ObjectId,
		ref: 'stop'
	}],
	trips: [TripSchema]
});

const Route = mongoose.model('route', RouteSchema)

module.exports = Route;