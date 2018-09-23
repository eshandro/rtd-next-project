const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const geoPointSchema = require('./geoPointSchema');

/*
	stop_id = unique id of stop
	name = name of stop
	desc = additional description of stop other than name
	stop_type = either a stop - 0, station - 1, or station entrance - 2
	* RTD only has stops or stations. A station is a structure or area that contains one or more stops
	* It appears that light rail stops are type 0 only.
	direction = direction parsed from the stop's description
	lat = latitude
	lng = longitude
	location = mongo geo location
	stop_times = list of stop_times associated with this stop
	trips = list of trips associated with this stop
 */

const StopSchema = new Schema({
	stop_id: String,
	name: String,
	desc: String,
	stop_type: Number,
	direction: String,
	lat: Number,
	lng: Number,
	location: geoPointSchema,
	stop_times: [{
		type: Schema.Types.ObjectId,
		ref: 'stoptime'
	}],
	// trips: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'trip'
	// }]
});

const Stop = mongoose.model('stop', StopSchema);

module.exports = Stop;