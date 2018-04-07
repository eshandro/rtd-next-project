const	Stop = require('../../database/models/stop'),
		// StopTime = require('../../database/models/stop_time'),
		Trip = require('../../database/models/trip'),
		addTripsToStops = require('../../src/scripts/static_feed/addTripsToStops'),
		assert = require('assert');

describe.only("Add Trips to each Stop", () => {
	let arr1 = ["111859139", "111859169","111859257"];
	it('can get list of a Stop\'s stop_times', (done) =>{
		Stop.findOne({stop_id: "25438"})
		.populate('stop_times')
		.then((doc) => {
			assert(doc.stop_times[0].stop_id === '25438')
			done();
		})
	})
	it('can get list of trips from array of trip_ids', (done) => {
		let arr1 = ["111859139", "111859169","111859257"];
		Trip.find({trip_id: {$in: arr1} }, 'trip_id _id')
		.then((docs) => {
			assert(docs.length === arr1.length)
			done();
		})

	})
	it('can make a copy of an array and remove duplicates', (done) => {
		let [arr2] = [arr1];
		assert(arr2 === arr1);
		let arr3 = [...arr2,...arr1];
		// Creates a Set from arr3 and a value in a Set can only occur once
		// Then, we use the spread operator to turn it back into an Array from a Set
		arr3 = [...(new Set(arr3))];
		assert(arr3.length === new Set(arr3).size)

		done();
	})
	xit('streams all stops', (done) => {
		let counter = 0;
		let stopsCursor = Stop.find({}).populate('stop_times').cursor();
		stopsCursor.on('data', (doc) => {
			if(counter <= 1) console.log("doc ",doc);
			counter++;
		})
		stopsCursor.on('close', ()=> {
			console.log("stopsCursor close")
			done();
		})

	})
	it("calls the addTripsToStops fn and adds trips to all stops", (done) => {
		addTripsToStops()
		.then((val) => {
			console.log("val in addTripsToStops ",val);
			done();
		})
		// .then(data => console.log('data from addTripsToRoutes',data));
	}).timeout(0)

})