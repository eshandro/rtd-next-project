const	Stop = require('../../database/models/stop'),
		// StopTime = require('../../database/models/stop_time'),
		Trip = require('../../database/models/trip'),
		addTripsToStops = require('../../src/scripts/static_feed/addTripsToStops'),
		assert = require('assert');

describe("Add Trips to each Stop", () => {
	let arr1 = ["111859139", "111859169","111859257"];
	xit('can get list of a Stop\'s stop_times', (done) =>{
		Stop.findOne({stop_id: "25438"})
		.populate('stop_times')
		.then((doc) => {
			assert(doc.stop_times[0].stop_id === '25438')
			done();
		})
	})
	xit('can get list of trips from array of trip_ids', (done) => {
		let arr1 = ["111859139", "111859169","111859257"];
		Trip.find({trip_id: {$in: arr1} }, 'trip_id _id')
		.then((docs) => {
			assert(docs.length === arr1.length)
			done();
		})

	})
	xit('can make a copy of an array and remove duplicates', (done) => {
		let [arr2] = [arr1];
		assert(arr2 === arr1);
		let arr3 = [...arr2,...arr1];
		// console.log("arr3 prior to Set ",arr3);
		// Creates a Set from arr3 and a value in a Set can only occur once
		// Then, we use the spread operator to turn it back into an Array from a Set
		arr3 = [...(new Set(arr3))];
		// console.log("arr3 after to Set ",arr3);
		// assert(arr3.length === new Set(arr3).size)
		assert(arr3.length === arr1.length)
		done();
	})
	xit('can create a unique list of trip_ids from a Stop\'s stop_times', (done) => {
		let tripIdsList;
		Stop.findOne({stop_id: "24894"}).populate('stop_times')
		.then((doc) => {
			tripIdsList = doc.stop_times;
			// console.log("tripIdsList initally ",tripIdsList);
			// console.log("tripIdsList.length initally ",tripIdsList.length);
			// convert array to include only trip_ids
			tripIdsList = tripIdsList.map(item => item.trip_id);
			// console.log("tripIdsList prior to new Set ",tripIdsList);
			tripIdsList = [... new Set(tripIdsList)];
			// console.log("tripIdsList after to new Set ",tripIdsList);
			// console.log("tripIdsList.length ",tripIdsList.length);
			done();
		})		
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
	xit("calls the addTripsToStops fn and adds trips to all stops", (done) => {
		addTripsToStops()
		.then((val) => {
			console.log("val in addTripsToStops ",val);
			done();
		})
		// .then(data => console.log('data from addTripsToRoutes',data));
	}).timeout(0)
	xit('queries db and get list of stop_times for a certain stop', (done) => {
		Stop.findOne({stop_id: "24894"}, 'stop_id stop_times name')
		.populate({
			path: 'stop_times',
			select: 'time stop_id stop_sequence',
			// match: {time: {$eq: "0854"}},
			// match: {stop_sequence: {$eq: 2} },
			options: {sort: {time: 1}}
		})
		.then((doc) => {
			// console.log("doc in get list of stop_times for a Stop",doc);
			for (var i = 0; i < 5; i++) {
				// ??? We get 2 identical times for each stop_id in stop_times??
				console.log("doc.stop_times[i] in get list of stop_times for a Stop ",doc.stop_times[i]);
			}
			done();
		})
	})

})