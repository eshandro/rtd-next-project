const Stop = require('../models/stop');

function getStopsList(route_id) {
	return Stop.find({}, 'stop_id name desc stop_type direction lat lng location',{sort: {name: 1}}).lean()
		.then((stops) => {
			return stops;
		});
}

module.exports = getStopsList;


