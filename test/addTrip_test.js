const assert = require('assert');
const Trip = require('../database/models/trip');

describe('Create a Trip', () => {
	let newTrip;
	it('saves a new trip', (done) => {
		newTrip = new Trip({
			trip_id: "111859139",
			route_id: "101C",
			day: "FR",
			direction: "0",
			headsign: "C-Line Union Station",
		});
		newTrip.save()
			.then((trip) => {
				assert(!trip.isNew);
				done();
			})
	})


});