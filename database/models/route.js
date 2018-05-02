const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
	route_id = unique id for route
	name = long name of route
	shortName = short name of route
	desc = detailed description of route
	type = type of transportation 
				0-lightrail
				1-subway
				2-rail
				3-bus
				4-ferry
				5-cable car
				6-gondola,suspended cable car
				7-funicular
			RTD only has 0, 2, & 3 types (0 & 2 are light rail, only A & B lines are type=2)
	directions = array or directions parsed from the desc 
	stops = list of stops associated with this route
	trips = list of trips associated with this route
 */
const RouteSchema = new Schema ({
	route_id: String,
	name: String,
	shortName: String,
	desc: String,
	type: Number,
	directions: [],
	// stops: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'stop'
	// }],
	trips: [{
		type: Schema.Types.ObjectId,
		ref: 'trip'
	}]
});

const Route = mongoose.model('route', RouteSchema)

module.exports = Route;