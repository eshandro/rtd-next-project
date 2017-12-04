const checkFeed = require('./checkFeed'),
		downloadFeed = require('./downloadFeed'),
		unzipFiles = require('./unzipFiles'),
		updateFeed = require('./updateFeed'),
		mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/",
		feedUrl = "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
		downloadFolder = "./src/temp-feed/",
		extractedFolder = "./src/feed/";

checkFeed(mainFeedUrl)
	.then((data) => {
		console.log('data in checkFeed call:', data);
		if (!data.needUpdate) {
			console.log('no update needed on checkFeed: ', data.msg);
			return ({downloadFeedSuccess: false, msg:data.msg});
		} 
		return downloadFeed(feedUrl, downloadFolder);

	})
	.then((downloadData) => {
		if(!downloadData.downloadFeedSuccess) {
			console.log("Feed not downloaded: ", downloadData.msg);
			return ({unzipSuccess:false, msg:downloadData.msg});
		}
		return unzipFiles(downloadData.msg, extractedFolder);
	})
	.then((unzipData) => {
		console.log("unzipData: ",unzipData);
		console.log("unzipData.msg ",unzipData.msg);
		updateFeed(unzipData.msg);
	})
	.catch((err) => {
		console.log("error in checkFeed: ", err);
	});

