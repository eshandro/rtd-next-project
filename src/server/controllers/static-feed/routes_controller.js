const getRoutesList = require('../../database/queries/getRoutesList');
const getRoutesInfoByTripIds = require('../../database/queries/getRoutesInfoByTripIds');

module.exports = {

	routesList (req, res, next) {
		getRoutesList()
		.then((routesList) => {
			res.json({ routesList });
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	},

	routesInfoByTripIds(req,res,next) {
		let tripids = req.body.tripids;

		getRoutesInfoByTripIds(tripids)
		.then((routes) => {
			res.json({ routes })
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	}

};
