const Stop = require('../models/stop');

function getStopIdByNameAndDirection(name,direction) {
	return Stop.findOne({name: name, direction: direction}, 'stop_id -_id').lean()
		.then((stop) => {
			// Some stops only have one direction, so the above query will fail
			if (!stop) return Stop.findOne({name:name}, 'stop_id -_id').lean();
			return stop;
		});
}

module.exports = getStopIdByNameAndDirection;


