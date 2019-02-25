const	FeedDates = require('../database/models/feed_dates');

function getLastModified() {
	return FeedDates.findOne({},'-_id').lean();
}
function updateLastModified(newDate,oldDate) {
	return FeedDates.findOne({}).then(doc => doc.updateOne({date:newDate, lastdate: oldDate}))
}
module.exports = {
	getLastModified: getLastModified,
	updateLastModified: updateLastModified
};