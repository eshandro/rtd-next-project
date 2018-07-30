const 	checkFeed = require('./checkFeed'),
		downloadFeed = require('./downloadFeed'),
		unzipFiles = require('./unzipFiles'),
		updateFeed = require('./updateFeed'),
		globals = require('../globals');


function updateStaticFeed (staticFeedUrl,forceUpdate) {
	return checkFeed(staticFeedUrl, forceUpdate)
		.then((checkFeedData) => {
			console.log('data in checkFeed call:', checkFeedData);
			if (!checkFeedData.needUpdate) {
				console.log('no update needed on checkFeed: ', checkFeedData.msg);
				return ({downloadFeedSuccess: false, msg:checkFeedData.msg});
			} 
			console.log("checkFeed a success, calling downloadFeed");
			return downloadFeed(globals.feedUrl, globals.downloadFolder);

		})
		.then((downloadData) => {
			if(!downloadData.downloadFeedSuccess) {
				console.log("Feed not downloaded: ", downloadData.msg);
				return ({unzipSuccess:false, msg:downloadData.msg});
			}
			console.log("downloadFeed a success, calling unzipFiles");
			return unzipFiles(downloadData.msg, globals.extractedFolder);
		})
		.then((unzipData) => {
			if (!unzipData.unzipSuccess) {
				console.log('unzipFiles failed: ', unzipData.msg);
				return ({updateFeedSuccess: false, msg:unzipData.msg});
			} else {
				console.log("unzipFiles a success, calling updateFeed");
				// 2nd param passed to updateFeed determines what files from zip file to update. Pass false to update all.
				return updateFeed(unzipData.msg, globals.filesToUpdate);
			}
		})
		.then((updateFeedData) => {
			if(!updateFeedData.updateFeedSuccess) {
				console.log("updateFeed failed: ",updateFeedData.msg);
				return ({updateStaticFeed: false, msg:updateFeedData.msg});
			} else {
				console.log("updateFeed a success, return true so know to call filterLightRail");
				return ({updateStaticFeed: true});
			}
		})
		.catch((err) => {
			console.log("error in updateStaticFeed: ", err);
			return ({updateStaticFeed: false, msg: err});
		});
}

module.exports = updateStaticFeed;