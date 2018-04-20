const	Stop = require('../../database/models/stop'),
		// StopTime = require('../../database/models/stop_time'),
		Route = require('../../database/models/route'),
		addStopsToRoutes = require('../../src/scripts/static_feed/addStopsToRoutes'),
		assert = require('assert');

describe("Add Stops to Routes", () => {
	it('can get list of a Routes\'s Trips and those Trip\'s StopTimes and their stop_ids', (done) =>{
		Route.findOne({route_id: "A"})
			.populate({
				path: 'trips',
				model: 'trip',
				options: {sort: {direction:1}},
				populate:{
					path: 'stop_times',
					model: 'stoptime',
					select: 'stop_id stop_sequence -_id',
					options: {sort: {stop_sequence: 1}}
				}
			})
		.then((doc) => {
			console.log("doc.trips[0].stop_times[0].stop_id ",doc.trips[0].stop_times[0].stop_id);
			console.log("doc.trips[doc.trips.length-1].stop_times[0].stop_id ",doc.trips[doc.trips.length-1].stop_times[0].stop_id);
			assert(doc.trips[0].stop_times[0].stop_id);			
			done();
		})
	}).timeout(0)
	it('confirms that a Route\'s list of Trips, sorted by direction, and that Trip\'s list of stop_times, sorted by stop_sequence , has identical lists of stop_ids when the Trip\'s direction is the same', (done) => {
		Route.findOne({route_id: "A"})
			.populate({
				path: 'trips',
				model: 'trip',
				options: {sort: {direction:1}},
				populate:{
					path: 'stop_times',
					model: 'stoptime',
					select: 'stop_id stop_sequence -_id',
					options: {sort: {stop_sequence: 1}}
				}
			})
		.then((doc) => {
			let 	tripsLen = doc.trips.length,
					stopTimesLen1 = doc.trips[0].stop_times.length,
					stopTimesLen2 = doc.trips[tripsLen-1].stop_times.length;

					list1 = doc.trips[0].stop_times,
					list2 = doc.trips[1].stop_times,
					list3 = doc.trips[tripsLen-1].stop_times,
					list4 = doc.trips[tripsLen-2].stop_times;
			// console.log("tripsLen ",tripsLen);
			// console.log("stopTimesLen1 ",stopTimesLen1);
			// console.log("stopTimesLen2 ",stopTimesLen2);
			// console.log("list1 ",list1);
			// console.log("list2 ",list2);
			// console.log("list3 ",list3);
			// console.log("list4 ",list4);

			let	firstIDList1 = list1[0].stop_id,
					lastIDList1 = list1[stopTimesLen1-1].stop_id,
					firstIDList2 = list2[0].stop_id,
					lastIDList2 = list2[stopTimesLen1-1].stop_id,
					firstIDList3 = list3[0].stop_id,
					lastIDList3 = list3[stopTimesLen2-1].stop_id,
					firstIDList4 = list4[0].stop_id,
					lastIDList4 = list4[stopTimesLen2-1].stop_id;
			
			console.log("stop_times length is the same on all Trips");
			assert(stopTimesLen1 === stopTimesLen2);

			console.log("firstIDList1 === firstIDList2");
			assert(firstIDList1 === firstIDList2);
			console.log("lastIDList1 === lastIDList2");
			assert(lastIDList1 === lastIDList2);

			console.log("firstIDList3 === firstIDList4");
			assert(firstIDList3 === firstIDList4);
			console.log("lastIDList3 === lastIDList4");
			assert(lastIDList3 === lastIDList4);

			done();
		})
	}).timeout(0)
	it('can create a list of stop_ids from a Routes\'s Trips and those Trips\' Stop_Time\'s stop_ids, making sure each stop_id is unique ', (done) => {
		Route.findOne({route_id: "101C"})
			.populate({
				path: 'trips',
				model: 'trip',
				options: {sort: {direction:1}},
				populate:{
					path: 'stop_times',
					model: 'stoptime',
					select: 'stop_id stop_sequence -_id',
					options: {sort: {stop_sequence: 1}}
				}
			})
		.then((doc) => {
			let 	directionChange = doc.trips.findIndex((element) => element.direction === 1),
					first = doc.trips[0].stop_times.map(item => item.stop_id),
					last = doc.trips[directionChange].stop_times.map(item => item.stop_id);

			let combined = [...first, ...last];
			combined = [... new Set(combined)];
			console.log("doc.route_id ",doc.route_id);
			// console.log("first ",first);
			// console.log("last ",last);
			// console.log("combined ",combined);
			console.log("first list of stop_times is unique");
			assert(first.length === new Set(first).size);
			console.log("last list of stop_times is unique");
			assert(last.length === new Set(last).size);
			console.log("combined list of stop_times is unique");
			assert(combined.length === new Set(combined).size);

			done();
		})

	}).timeout(0)
	xit("calls the addStopsroutes fn and adds Stops to all Routes", (done) => {
		addStopsToRoutes()
		.then((val) => {
			console.log("val in addStopsToRoutes ",val);
			done();
		})
		// .then(data => console.log('data from addTripsToRoutes',data));
	}).timeout(0)
	xit('runs various testing queries', (done) => {
		Route.findOne({route_id: "113B"})
			.populate({
				path: 'trips',
				model: 'trip',
				options: {sort: {direction:1}},
			})
		.then((doc) => {
			console.log("doc.trips[0] ",doc.trips[0]);
			console.log("doc.trips[doc.trips.length-1] ",doc.trips[doc.trips.length-1]);
		})
		done();
	})

})