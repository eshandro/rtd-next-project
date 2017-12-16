const	dir = require('path-reader'),
		fs = require('fs'),
		parseTxtFileToJson = require('./parseTxtFileToJson');


function updateFeed(path) {
	return dir.promiseFiles(path,{
		shortName:false,
		recursive:false,
		// match: /\.txt$/,
		// exclude: /^\./
		})
		.then((files) => {
			// Neither match or exclude options seem to be working to filter out .DS_Store etc files
			files = files.filter((file) => {
				return file.indexOf('.txt') !== -1
			});
			// console.log("files ",files);
			let i = 0, len = files.length;
			for (; i < len; i++) {
				let fullPath = './'+files[i];
				// console.log("fullPath ",fullPath);
				parseTxtFileToJson(fullPath);
			}
			return(len)
		})
		.then((length) => {
			return ({updateFeedSuccess: true, data: `${length} files parsed to JSON`})
		})
		.catch((err) => {
			console.log("Error in updateFeed dir.promise ", err);
			return ({updateFeedSuccess: false, data: err})
		})
}

// For testing only
// updateFeed('./src/feed/');

module.exports = updateFeed;