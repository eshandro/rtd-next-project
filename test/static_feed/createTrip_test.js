const assert = require('assert');
const createTrip = require('../../src/server/static_feed/createTripFromJson');

describe('Create a new Trip from JSON', () => {
	let json, newTrip;
	json = {"route_id":"101C","service_id":"FR","trip_id":"111859139","trip_headsign":"C-Line Union Station","direction_id":"0","block_id":" 101  3","shape_id":"1057525"};
	it('creates a single new Trip from JSON', (done) => {
		newTrip = createTrip(json);
		// console.log("newTrip ",newTrip);
		assert(newTrip.trip_id === json.trip_id);
		// To avoid having an extra document in our data set remove this newly made document
		newTrip.remove(done)
	})
});