const	FeedDates = require('../database/models/feed_dates');

function getLastModified() {
	return FeedDates.findOne({},'-_id').lean();
}
function updateLastModified(newDate,oldDate) {
	return FeedDates.findOne({}).then(doc => {
		if (!doc) {
			return FeedDates.create({ date: newDate, lastdate: oldDate });
		} else {
			return doc.updateOne({ date:newDate, lastdate: oldDate });
		}
	});
}
module.exports = {
	getLastModified: getLastModified,
	updateLastModified: updateLastModified
};