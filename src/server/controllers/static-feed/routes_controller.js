const getRoutesList = require('../../database/queries/getRoutesList');
const getRoutesInfoByTripIds = require('../../database/queries/getRoutesInfoByTripIds');

module.exports = {

	getRoutesList (req, res, next) {
		getRoutesList()
		.then((routesList) => {
			res.json({ routesList });
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	},

	getRoutesInfoByTripIds(req,res,next) {
		let tripids = req.params.tripids;
		res.json({tripids})
		// getRoutesInfoByTripIds(req.params.tripids)
		// .then((routes) => {
		// 	res.json({ routes })
		// })
		// .catch((err) => {
		// 	res.status(500).send(err);
		// })
	}

};
