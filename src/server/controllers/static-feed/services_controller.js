const getServiceIdsForDate = require('../../database/queries/getServiceIdsForDate');

module.exports = {

	getServiceIdsForDate (req, res, next) {
		let date = req.params.date;
		console.log("date ",date);
		// Convert datestring to Date Obj
		// datestring must be in format: '2018-09-24'
		// add T00:00 to force locale time vs UTC time
		date = new Date(date+'T00:00');
		if (date == 'Invalid Date') {
			res.status(500).send('Invalid Date');
			return;
		} 
		getServiceIdsForDate(date)
		.then((servicesList) => {
			res.json({ servicesList });
		})
		.catch((err) => {
			res.status(500).send(err);
		})
	},

};