const	Stop = require('../../database/models/stop'),
		StopTime = require('../../database/models/stop_time'),
		// addStopTimesToStops = require('../../src/scripts/static_feed/addStopTimesToStops'),
		assert = require('assert');

describe.only("Add Trips to each Stop", () => {
	it('can get list of a Stop\'s stop_times', (done) =>{
		Stop.findOne({stop_id: "25438"})
		.populate('stop_times')
		.then((doc) => {
			assert(doc.stop_times[0].stop_id === '25438')
			done();
		})
	})
	// it("calls the addStopTimesToStops fn and adds stop_times to all stops", (done) => {
	// 	addStopTimesToStops()
	// 	.then((val) => {
	// 		console.log("val in addStopTimesToStops ",val);
	// 		done();
	// 	})
	// 	// .then(data => console.log('data from addTripsToRoutes',data));
	// }).timeout(0)

})