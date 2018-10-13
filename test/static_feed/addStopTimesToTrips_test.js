const	Trip = require('../../src/server/database/models/trip'),
		StopTime = require('../../src/server/database/models/stop_time'),
		addStopTimesToTrips = require('../../src/server/static_feed/addStopTimesToTrips'),
		assert = require('assert');

describe("Add StopTimes to each Trip", () => {

	xit("calls the addStopTimesToTrips fn and adds stop_times to all Trips", (done) => {
		addStopTimesToTrips()
		.then((val) => {
			console.log("val in addStopTimesToTrips ",val);
			done();
		})

	}).timeout(0)

})