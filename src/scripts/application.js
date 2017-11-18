const checkFeed = require('./checkFeed'),
		downloadFeed = require('./downloadFeed'),
		unzipFiles = require('./unzipFiles'),
		mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/",
		feedUrl = "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
		downloadFolder = "./src/temp-feed/";

checkFeed(mainFeedUrl)
.then((data) => {
	console.log('data in checkFeed call:', data);
	if (!data.needUpdate) {
		console.log('no update needed on checkFeed: ', data.msg);
		return;
	} 
	downloadFeed(feedUrl, downloadFolder, 'utf-8', unzipFiles);

});
