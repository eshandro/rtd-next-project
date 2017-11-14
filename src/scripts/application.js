const checkFeed = require('./checkFeed'),
		mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/",
		feedUrl = "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
		downloadFolder = "./test-download/";

checkFeed(mainFeedUrl)
.then((data) => {
	console.log(data);
	if (data.needUpdate) {

	} else {
		console.log('data.msg returned from checkFeed', data.msg);
	}
});
