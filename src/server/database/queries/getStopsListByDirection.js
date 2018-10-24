const Stop = require('../models/stop');

function getStopsListByDirection(dir) {
	return Stop.find({direction: dir }, 'stop_id name desc stop_type direction lat lng location').lean()
		.then((stops) => {
			return stops;
		});
}

module.exports = getStopsListByDirection;


