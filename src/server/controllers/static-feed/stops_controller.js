const getXNextStopTimesForStop = require('../../database/queries/getXNextStopTimesForStop');
const getStopsListByIds = require('../../database/queries/getStopsListByIds');
const getStopsListByDirection = require('../../database/queries/getStopsListByDirection');

module.exports = {

	nextXStopTimesForStop (req, res, next) {
		let stopid = req.body.stopid;
		let tripids = req.body.tripids;
		let num = req.body.num;

		getXNextStopTimesForStop(stopid,tripids,num)
		.then((stoptimes) => {
			res.json({ stoptimes });
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	},

	stopsByIds(req,res,next) {
		let stopids = req.body.stopids;
		console.log("stopids in stop_controller stopsByIds ",stopids);
		getStopsListByIds(stopids)
		.then(stops => res.json({stops}))
		.catch(err => res.status(500).send(err))
	},

	stopsByDirection(req,res,next) {
		let dir = req.params.dir;
		getStopsListByDirection(dir)
		.then(stops => res.json({stops}))
		.catch(err => res.status(500).send(err))
	}
};