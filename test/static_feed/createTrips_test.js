const assert = require('assert');
// const Trip = require('../database/models/trip');
const createTrips = require('../../src/scripts/static_feed/createTrips');

describe('Create a Trips collection', () => {
	let newTrip;
	it('reads and list trips JSON', (done) => {
		createTrips(__dirname + '/../../feed/json/trips-lr.json');
		// newTrip = new Trip({
		// 	id: "111859139",
		// 	route_id: "101C",
		// 	day: "FR",
		// 	direction: "0",
		// 	headsign: "C-Line Union Station",
		// });
		// newTrip.save()
		// 	.then((trip) => {
		// 		assert(!trip.isNew);
		// 		done();
		// 	})
		done();
	})


});