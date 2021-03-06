const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');
const dateHelpers = require('../../utils/dateHelpers');
module.exports = {

	serviceIdsForDate (req, res, next) {
		let date = req.params.date;
		let dateObj = dateHelpers.convertISODateStringToDateObject(date);
		if (!dateObj || dateObj == 'Invalid Date') {
			res.status(500).send({ "err": "Invalid Date" });
			return;
		} 
		getServiceIdsForDate(dateObj)
		.then((serviceids) => {
			res.json({ serviceids });
		})
		.catch((err) => {
			res.status(500).send(err);
		});
	},

};