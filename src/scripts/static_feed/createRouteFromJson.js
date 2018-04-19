const Route = require('../../../database/models/route');
/** json obj **/
// "route_id":"101C"
// "route_short_name":"C"
// "route_long_name":"Union Station to Littleton-Mineral Station"
// "route_desc":"This Route Travels Northbound & Southbound"
// "route_type":"0"
// "route_url":"http://www.rtd-denver.com/Schedules.shtml"
// "route_color":"F79239"
// "route_text_color":"FFFFFF"

/** Route Schema: **/
// route_id: String,
// name: String,
// shortName: String,
// desc: String,
// directions: [],
// stops: [{
// 	type: Schema.Types.ObjectId,
// 	ref: 'stop'
// }],
// // trips: [TripSchema]
// trips: [{
// 	type: Schema.Types.ObjectId,
// 	ref: 'trip'
// }]

function createRoute(json) {
	let regex = /^.*Travels\s*/i;
	let newRoute = new Route ({
		route_id: json.route_id,
		name: json.route_long_name,
		shortName: json.route_short_name,
		desc: json.route_desc,
		directions: json.route_desc.replace(regex,'').replace(/&\s/,'').split(' '),
		stops: [],
		trips: []
	});
	return newRoute;
}

module.exports = createRoute;