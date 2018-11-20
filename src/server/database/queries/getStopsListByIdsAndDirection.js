const Stop = require('../models/stop');

function getStopsListByIdsAndDirection(stopids,dir) {
	return Stop.find({stop_id: {$in: stopids}, direction: dir }, 'stop_id name desc stop_type direction lat lng location').lean()
		.then((stops) => {
			return stops;
		});
}

module.exports = getStopsListByIdsAndDirection;


