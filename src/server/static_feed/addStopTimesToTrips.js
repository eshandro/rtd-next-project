const	StopTime = require('../database/models/stop_time'),
		Trip = require('../database/models/trip');


function getStopTimes(tripID) {
	return StopTime.find({trip_id: tripID});
}


function addStopTimesToTrips() {

	let tripsCursor = Trip.find({},'trip_id stop_times route_id').cursor();

	return tripsCursor.eachAsync((doc) => {
		return getStopTimes(doc.trip_id)
		.then((stoptimes) => {
			return doc.updateOne({stop_times: stoptimes});
		});
	})
	.then(() => {
		console.log('tripsCursor in addStopTimesToTrips done!');
		return Promise.resolve({complete: true});
	})
	.catch((err) => {
		console.log('error in addStopTimesToTrips', err);
		return Promise.reject({complete: false});
	});
}
module.exports = addStopTimesToTrips;