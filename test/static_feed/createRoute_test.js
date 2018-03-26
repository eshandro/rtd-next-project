const assert = require('assert');
const createRoute = require('../../src/scripts/static_feed/createRouteFromJson');

describe('Create a new Route from JSON', () => {
	let json, newRoute;
	json = {
		"route_id":"101C",
		"route_short_name":"C",
		"route_long_name":"Union Station to Littleton-Mineral Station",
		"route_desc":"This Route Travels Northbound & Southbound",
		"route_type":"0",
		"route_url":"http://www.rtd-denver.com/Schedules.shtml",
		"route_color":"F79239",
		"route_text_color":"FFFFFF"};
	it('creates a single new Route from JSON', (done) => {
		newRoute = createRoute(json);
		// console.log("newRoute ",newRoute);
		assert(newRoute.route_id === json.route_id);
		done();
	})
});