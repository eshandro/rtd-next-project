const getXNextStopTimesForStop = require('../../database/queries/getXNextStopTimesForStop');
const getStopsListByIds = require('../../database/queries/getStopsListByIds');
const getStopsListByDirection = require('../../database/queries/getStopsListByDirection');
const getStopIdByNameAndDirection = require('../../database/queries/getStopIdByNameAndDirection');

module.exports = {

	stopsByIds(req,res,next) {
		let stopids = req.body.stopids;
		console.log("stopids in stop_controller stopsByIds ",stopids);
		getStopsListByIds(stopids)
		.then(stops => res.json({stops}))
		.catch(err => res.status(500).send(err));
	},

	stopsByDirection(req,res,next) {
		let dir = req.params.dir;
		getStopsListByDirection(dir)
		.then(stops => res.json({stops}))
		.catch(err => res.status(500).send(err));
	},

	getStopByNameAndDirection(req,res,next) {
		let dir = req.params.dir;
		let name = req.params.name;
		getStopIdByNameAndDirection(name,dir)
		.then(stop => res.json(stop))
		.catch(err => res.status(500).send(err));
	}
};