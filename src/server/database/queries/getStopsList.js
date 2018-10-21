const Stop = require('../models/stop');

function getStopsList(stopids) {
	return Stop.find({stop_id: {$in: stopids} }, 'stop_id name desc stop_type direction lat lng location').lean()
		.then((stops) => {
			return stops;
		});
}

module.exports = getStopsList;


