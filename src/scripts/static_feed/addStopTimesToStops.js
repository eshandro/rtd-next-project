const	Stop = require('../../../database/models/stop'),
		StopTime = require('../../../database/models/stop_time');


function getStopTimes(stopID) {
	return StopTime.find({stop_id: stopID});
}


function addStopTimesToStops() {

	let stopsCursor = Stop.find({},'stop_id stop_times').cursor();

	return stopsCursor.eachAsync((doc) => {
		// First clear out existing stop_times
		doc.update({stop_times: []})
		.then(() => {
			return getStopTimes(doc.stop_id);
		})
		.then((stoptimes) => {
			return doc.update({stop_times: stoptimes});
		});
	
	})
	.then(() => {
		console.log('stopsCursor in addStopTimesToStops done!');
		return Promise.resolve({complete: true});
	})
	.catch((err) => {
		console.log('error in addStopTimesToStops', err);
		return Promise.reject({complete: false});
	});

}
module.exports = addStopTimesToStops;