const getXNextStopTimesForStop = require('../../database/queries/getXNextStopTimesForStop');
const getStopsListByRoute = require('../../database/queries/getStopsListByRoute');

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

	getStopsByRoute(req,res,next) {
		let routeid = req.param.route;

		getStopsListByRoute(routeid)
		.then(stops => res.json({stops}))
		.catch(err => res.status(500).send(err))
	}
};