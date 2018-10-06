const getXNextStopTimesForStop = require('../../database/queries/getXNextStopTimesForStop');

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


};