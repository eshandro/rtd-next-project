const checkFeed = require('./checkFeed'),
		downloadFeed = require('./downloadFeed'),
		unzipFiles = require('./unzipFiles'),
		updateFeed = require('./updateFeed'),
		filterLightRail = require('./filterLightRail');

const	mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/",
		feedUrl = "http://www.rtd-denver.com/GoogleFeeder/google_transit.zip",
		downloadFolder = __dirname + "/../temp-feed/",
		extractedFolder = __dirname + "/../feed/",
		filesToUpdate = ['routes.txt','stop_times.txt','stops.txt','trips.txt'];

function updateStaticFeed (staticFeedUrl) {
	return checkFeed(staticFeedUrl)
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
				return ({updateFeedSuccess: false, data:unzipData.data});
			} else {
				console.log("unzipFiles a success, calling updateFeed");
				// 2nd param passed to updateFeed determines what files from zip file to update. Pass false to update all.
				return updateFeed(unzipData.data, filesToUpdate);
			}
		})
		.then((updateFeedData) => {
			if(!updateFeedData.updateFeedSuccess) {
				console.log("updateFeed err: ",updateFeedData.data);
				return ({updateStaticFeed: false});
			} else {
				console.log("updateFeed a success, calling filterLightRail");
				return ({updateStaticFeed: true});
			}
		})
		.catch((err) => {
			console.log("error in updateStaticFeed: ", err);
			return ({updateStaticFeed: false, data: err});
		});
}
updateStaticFeed(mainFeedUrl)
	.then((data) => {
		console.log("data returned from updateStaticFeed:",data);
		if(!data.updateStaticFeed) {
			// don't call filterLightRail
			return ({lrJsonSuccess: false, data: "filterLightRail not called because updateStaticFeed failed or not needed"});
		} else {
			return filterLightRail();
		}
	})
	.then((data)=> {
		console.log("data after filterLightRail called or not called: ",data);
		if (!data.lrJsonSuccess) {
			return ({updateStaticFeed: false, data:data.data});
		} else {
			return {updateStaticFeed: true, data: data.data};
		}
	}).
	catch((err) => {
		console.log("error in updateStaticFeed after filterLightRail:", err);
		return ({updateStaticFeed: false, data: err});
	})

