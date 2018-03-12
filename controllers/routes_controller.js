const Route = require('../database/models/route');

module.exports = {

	create(req, res, next) {
		Route.create(driverProps)
		.then(driver => res.send(driver))
		.catch()
	},

};
