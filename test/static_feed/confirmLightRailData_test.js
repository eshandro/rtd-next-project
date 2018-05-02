const assert = require('assert');
const Trip = require('../../database/models/trip'),
		Route = require('../../database/models/route'),
		Stop = require('../../database/models/stop'),
		StopTime = require('../../database/models/stop_time'),
		Calendar = require('../../database/models/calendar'),
		CalendarDates = require('../../database/models/calendar_dates'),
		globals = require('../../src/scripts/globals');


// We know that Routes are correctly filtered using the route_ids regexp (/101.|103W|^A$|107R|113B|109L/).
// We know that Trips are correctly filtered using the same logic as above. Also create the list of trip_ids used on other filters.
// Need to test of using list of trip_ids gets the correct stop_times



describe.only('Confirms we\'ve filtered Light Rail Data correct', () => {
	let trip_idsList, stop_idsList;
	it('can confirm Trips only includes route_ids from regexp', (done) => {
		let count1, count2;
		Trip.count({})
			.then((count) => {
				count1 = count;
				Trip.count({'route_id': {$regex: globals.lightRailRoutesRegex} })
					.then((countAgain) => {
						count2 = countAgain;
						assert(count1 === count2);
						done();
					})
			})
	})
	it('can get a list of trip_ids from Trips that have already been filtered', (done) => {
		Trip.find({},'trip_id -_id').lean()
		.then((docs) => {
			trip_idsList = docs.map((item) => item.trip_id);
			// console.log("trip_idsList ",trip_idsList);
			// confirm list of trips is unique
			assert(trip_idsList.length === new Set(trip_idsList).size);
			done();
		})
	})
	it('can use the trip_idsList to filter stop_times', (done) => {
		let count1, count2;
		StopTime.count({})
		.then((count) => {
			count1 = count;
			StopTime.count({'trip_id': {$in: trip_idsList} })
			.then((countAgain) => {
				count2 = countAgain;
				assert(count1 === count2);
				done();
			})
		})
	})
	it('can get a list of Stops for a route going in one direction', (done) => {
		Route.findOne({route_id: '101D'}, 'stops directions name')
		.populate({
			path: 'stops',
			model: 'stop',
			// match: {direction: 'North'},
			select: 'stop_id name direction lat lng -_id',
			sort: {lng: 1}
		})
		.then((doc) => {
			console.log("doc ",doc);
			console.log("doc.stops.length", doc.stops.length)
			done();
		})

	})
	xit('can get a list of stoptimes for a given stop', (done) => {
		// Littleton Downtown stop and going North on a Friday for Route 101D
		Stop.findOne({name:"Littleton / Downtown Station", direction: "North"})
		.populate({
			path: 'trips',
			match: {day: {$regex: /^fr/i}, route_id: '101D'},
			select: 'trip_id direction -_id',
			populate: {
				path: 'stop_times',
				model: 'stoptime',
				select: 'time stop_sequence -_id',
				sort: {stop_sequence: 1}
			}
		})
		.then((doc) => {
			// console.log("doc in Stop.findOne ",doc);
			console.log("doc.trips.length ",doc.trips.length);
			console.log("doc.trips[0] in Stop.findOne ",doc.trips[0]);
			console.log("doc.trips[0].stop_times ",doc.trips[0].stop_times);
			done();
		})
	})


});

