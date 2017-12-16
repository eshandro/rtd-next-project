const checkFeed = require('./checkFeed'),
		downloadFeed = require('./downloadFeed'),
		unzipFiles = require('./unzipFiles'),
		updateFeed = require('./updateFeed');

const	mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/",
		feedUrl = "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
		downloadFolder = "./src/temp-feed/",
		extractedFolder = "./src/feed/";

checkFeed(mainFeedUrl)
	.then((checkFeedData) => {
		console.log('data in checkFeed call:', checkFeedData);
		if (!checkFeedData.needUpdate) {
			console.log('no update needed on checkFeed: ', checkFeedData.data);
			return ({downloadFeedSuccess: false, data:checkFeedData.data});
		} 
		console.log("checkFeed a success, calling downloadFeed");
		return downloadFeed(feedUrl, downloadFolder);

	})
	.then((downloadData) => {
		if(!downloadData.downloadFeedSuccess) {
			console.log("Feed not downloaded: ", downloadData.data);
			return ({unzipSuccess:false, data:downloadData.data});
		}
		console.log("downloadFeed a success, calling unzipFiles");
		return unzipFiles(downloadData.data, extractedFolder);
	})
	.then((unzipData) => {
		if (!unzipData.unzipSuccess) {
			console.log('unzipFiles err: ', unzipData.data);
		} else {
			console.log("unzipFiles a success, calling updateFeed");
			return updateFeed(unzipData.data);
		}
	})
	.then((updateFeedData) => {
		if(!updateFeedData.updateFeedSuccess) {
			console.log("updateFeed err ",updateFeedData.data);
		}
		console.log("updateFeed a success, static feed done being updated");
	})
	.catch((err) => {
		console.log("error in checkFeed: ", err);
	});

