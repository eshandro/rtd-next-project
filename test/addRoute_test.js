const assert = require('assert');
const Route = require('../src/server/database/models/route');
	// route_id: String,
	// name: String,
	// shortName: String,
	// desc: String,
	// stops: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'stop'
	// }],
	// // trips: [TripSchema]
	// trips: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'trip'
	// }]
	// {"route_id":"101C","route_short_name":"C","route_long_name":"Union Station to Littleton-Mineral Station","route_desc":"This Route Travels Northbound & Southbound","route_type":"0","route_url":"http://www.rtd-denver.com/Schedules.shtml","route_color":"F79239","route_text_color":"FFFFFF"}
describe('Create a Route', () => {
	let newRoute;
	it('saves a new route', (done) => {
		newRoute = new Route({
			route_id: "101C",
			name: "Union Station to Littleton-Mineral Station",
			shortName: "C",
			desc: "This Route Travels Northbound & Southbound",
			stops: [],
			trips: []
		});
		newRoute.save()
			.then((route) => {
				assert(!route.isNew);
				// done();
				route.remove(done)
			})
	})


});