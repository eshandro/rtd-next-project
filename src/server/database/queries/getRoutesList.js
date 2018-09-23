const Route = require('../models/route');

function getRoutesList() {
	return Route.find({}, 'route_id name shortName desc directions').lean()
		.then((routes) => {
			return routes;
		});
}

module.exports = getRoutesList;