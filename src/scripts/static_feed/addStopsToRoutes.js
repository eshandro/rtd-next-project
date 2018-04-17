const	Route = require('../../../database/models/route'),
		Stop = require('../../../database/models/stop');


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
		let tripsLen = doc.trips.length;
		let [stopIdsList1] = [doc.trips[0].stop_times],
			 [stopIdsList2] = [doc.trips[tripsLen-1].stop_times];
		// change from array of mongoose objects to array of just stop_ids
		stopIdsList1 = stopIdsList1.map(item => item.stop_id);
		stopIdsList2= stopIdsList2.map(item => item.stop_id);
		// Creates a Set from arr and a value in a Set can only occur once
		// Then, we use the spread operator to turn it back into an Array from a Set
		stopIdsList1 = [... new Set(stopIdsList1)];
		stopIdsList2 = [... new Set(stopIdsList2)];

		let stopIdsList = [...stopIdsList1, ...stopIdsList2];
		
		// clear out existing stops before adding stops
		doc.update({stops: []})
		.then(() => {
			return getStops(stopIdsList);
		})
		.then((stops) => {
			return doc.update({stops: stops})
		})
	
	})
	.then(() => {
		console.log('routesCursor in addStopsToRoutes done!');
		return Promise.resolve({complete: true});
	})

}
module.exports = addStopsToRoutes;