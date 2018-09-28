const getTripIdsByServiceIds = require('../../database/queries/getTripIdsByServiceIds');

module.exports = {

	getTripIdsByServiceIds (req, res, next) {
		let serviceids = req.params.serviceids;
		console.log("serviceids ",serviceids);
		console.log("typeof serviceids ",typeof serviceids);
		console.log("decodeURI(serviceids) ",decodeURI(serviceids));

		getTripIdsByServiceIds(serviceids)
		.then((tripIds) => {
			res.json({ tripIds });
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	},

};