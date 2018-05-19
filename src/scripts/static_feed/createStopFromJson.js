const Stop = require('../../../database/models/stop');
/** json obj **/
// {"stop_id":"34467"
// "stop_code":"34467"
// "stop_name":"40th & Colorado Station Track 1"
// "stop_desc":"Vehicles Travelling East"
// "stop_lat":"39.776071"
// "stop_lon":"-104.942045"
// "zone_id":""
// "stop_url":""
// "location_type":"0"
// "parent_station":"34500"
// "stop_timezone":""
// "wheelchair_boarding":"1"}


/** Stop Schema: **/
// stop_id: String,
// name: String,
// desc: String,
// direction: String,
// stop_type: Number
// lat: Number,
// lng: Number,
// // lng, lat in coordinates
// location: geoPointSchema,
// stop_times: [{
// 	type: Schema.Types.ObjectId,
// 	ref: 'stoptime'
// }],
// // stop_times: [StopTimeSchema],
// // trips: [TripSchema]
// trips: [{
// 	type: Schema.Types.ObjectId,
// 	ref: 'trip'
// }]

function createStop(json) {
	let newStop = new Stop ({
		stop_id: json.stop_id,
		name: json.stop_name,
		desc: json.stop_desc,
		stop_type: json.location_type,
		direction: parseDirection(json.stop_desc),
		lat:json.stop_lat,
		lng: json.stop_lon,
		location: {type:"Point", coordinates:[json.stop_lon, json.stop_lat]},
		stop_times: [],
		trips: []
	});
	return newStop;
}

function parseDirection (direction) {
	// direction is something like "Vehicles Travelling North"
	// North and East trains travel towards DT and have a direction_id: 0
	// South and West trains travel away from DT and have a direciton_id: 1
	// NOTE: some stops travel Southeast or Northwest, direction always starts with a cap letter
	// let regex = /Vehicles\s*Travelling\s*/i;
	if (direction.search(/\s*North/) !== -1 || direction.search(/\s*East/) !== -1) {
		return 0;
	} else {
		return 1;
	}
}

module.exports = createStop;