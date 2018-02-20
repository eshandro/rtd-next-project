const checkFeed = require('./checkFeed'),
		downloadFeed = require('./downloadFeed'),
		unzipFiles = require('./unzipFiles'),
		updateFeed = require('./updateFeed'),
		globals = require('./globals');


function updateStaticFeed (staticFeedUrl) {
	return checkFeed(staticFeedUrl)
		.then((checkFeedData) => {
			console.log('data in checkFeed call:', checkFeedData);
			if (!checkFeedData.needUpdate) {
				console.log('no update needed on checkFeed: ', checkFeedData.data);
				return ({downloadFeedSuccess: false, data:checkFeedData.data});
			} 
			console.log("checkFeed a success, calling downloadFeed");
			return downloadFeed(globals.feedUrl, globals.downloadFolder);

		})
		.then((downloadData) => {
			if(!downloadData.downloadFeedSuccess) {
				console.log("Feed not downloaded: ", downloadData.data);
				return ({unzipSuccess:false, data:downloadData.data});
			}
			console.log("downloadFeed a success, calling unzipFiles");
			return unzipFiles(downloadData.data, globals.extractedFolder);
		})
		.then((unzipData) => {
			if (!unzipData.unzipSuccess) {
				console.log('unzipFiles err: ', unzipData.data);
				return ({updateFeedSuccess: false, data:unzipData.data});
			} else {
				console.log("unzipFiles a success, calling updateFeed");
				// 2nd param passed to updateFeed determines what files from zip file to update. Pass false to update all.
				return updateFeed(unzipData.data, globals.filesToUpdate);
			}
		})
		.then((updateFeedData) => {
			if(!updateFeedData.updateFeedSuccess) {
				console.log("updateFeed err: ",updateFeedData.data);
				return ({updateStaticFeed: false});
			} else {
				console.log("updateFeed a success, return true so know to call filterLightRail");
				return ({updateStaticFeed: true});
			}
		})
		.catch((err) => {
			console.log("error in updateStaticFeed: ", err);
			return ({updateStaticFeed: false, data: err});
		});
}

module.exports = updateStaticFeed;