const Stop = require('../models/stop');

function getStopIdByNameAndDirection(name,direction) {
	return Stop.findOne({name: name, direction: direction}, 'stop_id -_id').lean()
		.then((stop) => {
			console.log("stop in getStopIdByNameAndDirection ",stop);
			return stop;
		});
}

module.exports = getStopIdByNameAndDirection;


