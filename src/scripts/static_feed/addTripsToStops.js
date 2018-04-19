const	Trip = require('../../../database/models/trip'),
		Stop = require('../../../database/models/stop');


function getTrips(tripsList) {
	return Trip.find({trip_id: {$in: tripsList} });
}


function addTripsToStops() {
	let stopsCursor = Stop.find({}).populate('stop_times','trip_id -_id').cursor();

	return stopsCursor.eachAsync((doc) => {
		let [tripsList] = [doc.stop_times];
		// change from array of mongoose objects to array of just trip_ids
		tripsList = tripsList.map(item => item.trip_id);
		// Creates a Set from arr3 and a value in a Set can only occur once
		// Then, we use the spread operator to turn it back into an Array from a Set
		tripList = [... new Set(tripsList)];
		
		// clear out existing trips before adding trips
		doc.update({trips: []})
		.then(() => {
			return getTrips(tripsList);
		})
		.then((trips) => {
			return doc.update({trips: trips})
		})
	
	})
	.then(() => {
		console.log('stopsCursor in addTripsToStops done!');
		return Promise.resolve({complete: true});
	})
	.catch((err) => {
		console.log('error in addTripsToStops', err);
		return Promise.reject({complete: false});
	})
}
module.exports = addTripsToStops;