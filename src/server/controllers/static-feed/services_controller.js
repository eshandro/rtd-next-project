const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');

module.exports = {

	getServiceIdsForDate (req, res, next) {
		let date = req.params.date;
		getServiceIdsForDate(date)
		.then((servicesList) => {
			res.json({ servicesList });
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	}

};