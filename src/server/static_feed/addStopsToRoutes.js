const	Route = require('../database/models/route'),
		Stop = require('../database/models/stop');


function getStops(stopIdsList) {
	return Stop.find({stop_id: {$in: stopIdsList} });
}


function addStopsToRoutes() {
	let routesCursor = Route.find({})
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
		.cursor();

	return routesCursor.eachAsync((doc) => {
		let directChange = doc.trips.findIndex((element) => element.direction === 1);
		let [stopIdsDirection0] = [doc.trips[0].stop_times],
			[stopIdsDirection1] = [doc.trips[directChange].stop_times];
		
		// change from array of mongoose objects to array of just stop_ids
		stopIdsDirection0 = stopIdsDirection0.map(item => item.stop_id);
		stopIdsDirection1 = stopIdsDirection1.map(item => item.stop_id);
		// Creates a Set from arr and a value in a Set can only occur once
		// Then, we use the spread operator to turn it back into an Array from a Set
		// 
		// NOTE: No longer creating a unique array via new Set because:
		// 1. Line A, "Union Station Track 1" stop_id=34667, is only stop_id for this line at Union Station and has a direction of 
		// 	West always -- all other stops have 2 stop_ids, one for each direction travelled.
		// 2.	Line B, "Union Station Track 7" stop_id=34781, is only stop_id for this line at Union Station and has a direction of 
		// 	East always -- all other stops have 2 stop_ids, one for each direction travelled.
		// 3. Line L, "30th & Downing Station" stop_id=23051 is only stop_id for this line at 30th & Downing and has a direciton of 
		// 	North always -- all other stops have 2 stop_ids, one for each direction travelled.
		// stopIdsDirection0 = [... new Set(stopIdsDirection0)];
		// stopIdsDirection1 = [... new Set(stopIdsDirection1)];

		let stopIdsList = [...stopIdsDirection0, ...stopIdsDirection1];
		
		// clear out existing stops before adding stops
		doc.update({stops: []})
			.then(() => {
				return getStops(stopIdsList);
			})
			.then((stops) => {
				return doc.updateOne({stops: stops});
			});
	})
	.then(() => {
		console.log('routesCursor in addStopsToRoutes done!');
		return Promise.resolve({complete: true});
	})
	.catch((err) => {
		console.log('error in addStopsToRoutes', err);
		return Promise.reject({complete: false});
	});

}
module.exports = addStopsToRoutes;