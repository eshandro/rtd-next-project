const getTripIdsByServiceIds = require('../../database/queries/getTripIdsByServiceIds');
const getTripsByDateAndRoute = require('../../database/queries/getTripsByDateAndRoute');
const getTripsByDateAndRouteAndDirection = require('../../database/queries/getTripsByDateAndRouteAndDirection');
const getTripsIdsListByDateAndRouteAndDirection = require('../../database/queries/getTripsIdsListByDateAndRouteAndDirection');
const dateHelpers = require('../../utils/dateHelpers');

module.exports = {

	tripIdsByServiceIds (req, res, next) {
		let serviceids = req.body.serviceids;

		getTripIdsByServiceIds(serviceids)
		.then((tripids) => {
			res.json({ tripids });
		})
		.catch((err) => {
			res.status(500).send(err);
		});
	},

	tripsIdsListByDateAndRouteAndDirection (req,res, next) {
		let date = req.body.date;
		let route = req.body.route;
		let direction = req.body.direction;
		let serviceids = req.body.serviceids;
		let dateObj  = dateHelpers.convertISODateStringToDateObject(date);
		if (dateObj == 'Invalid Date') {
			res.status(500).send('Invalid Date');
			return;
		}
		getTripsIdsListByDateAndRouteAndDirection(dateObj, route, direction, serviceids)
		.then((trips) => {
			res.json({ trips });
		})
		.catch((err) => {
			res.status(500).send(err);
		});		

	},

	tripsByDateAndRoute (req, res, next) {
		let date = req.params.date;
		let route = req.params.route;
		let dateObj  = dateHelpers.convertISODateStringToDateObject(date);
		if (dateObj == 'Invalid Date') {
			res.status(500).send('Invalid Date');
			return;
		} 
		getTripsByDateAndRoute(dateObj,route)
		.then((trips) => {
			res.json({ trips });
		})
		.catch((err) => {
			res.status(500).send(err);
		});
	},

	tripsByDateAndRouteAndDirection (req,res, next) {
		let date = req.body.date;
		let route = req.body.route;
		let direction = req.body.direction;
		let serviceids = req.body.serviceids;
		let dateObj  = dateHelpers.convertISODateStringToDateObject(date);
		if (dateObj == 'Invalid Date') {
			res.status(500).send('Invalid Date');
			return;
		}
		getTripsByDateAndRouteAndDirection(dateObj, route, direction, serviceids)
		.then((trips) => {
			res.json({ trips });
		})
		.catch((err) => {
			res.status(500).send(err);
		});		

	}

};