const getXNextStopTimesForStop = require('../../database/queries/getXNextStopTimesForStop');
const getStopsList = require('../../database/queries/getStopsList');

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

	getStopsList(req,res,next) {
		let stopids = req.body.stopids;
		console.log("stopids in stop_controller getStopsList ",stopids);
		getStopsList(stopids)
		.then(stops => res.json({stops}))
		.catch(err => res.status(500).send(err))
	}
};