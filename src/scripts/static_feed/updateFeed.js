const	dir = require('path-reader'),
		fs = require('fs'),
		parseTxtFileToJson = require('./parseTxtFileToJson');

/**
 * parses unzipped files, limited by filesToInclude, to JSON
 * @param  {string} path           path to unzipped files
 * @param  {array} filesToInclude  list of files to parse 
 * @return {promise}                object {updateFeedSuccess: boolean, data: string}
 *                                         updateFeedSuccess: used to determine next step
 *                                         data: error or number of files parsed to JSON
 */
function updateFeed(path,filesToInclude) {
	return dir.promiseFiles(path,{
		shortName:false,
		recursive:false,
		// match: /\.txt$/,
		// exclude: /^\./
		})
		.then((files) => {
			// console.log("files before ",files);
			// Neither match or exclude options seem to be working to filter out .DS_Store etc files
			files = files.filter((file) => {
				return file.indexOf('.txt') !== -1;
			});
			if (filesToInclude) {
				files = files.filter((file) => {
					// delete unneeded txt files
					if (!filesToInclude.includes(file.substring(file.lastIndexOf('/')+1))) {
						fs.unlinkSync(file);
						return false;
					} else {
						return true;	
					}
					
				});
			}
			// console.log("files after",files);
			let 	i = 0, 
					len = files.length,
					parsePromises = [];
			for (; i < len; i++) {
				let fullPath = files[i];
				let parsePromise = parseTxtFileToJson(fullPath);
				parsePromises.push(parsePromise);
			}
			return Promise.all(parsePromises).then((returns) => {
				return(len);
			});
		})
		.then((length) => {
			return ({updateFeedSuccess: true, msg: `${length} files parsed to JSON`});
		})
		.catch((err) => {
			console.log("Error in updateFeed dir.promise ", err);
			return ({updateFeedSuccess: false, msg: err});
		});
}

// For testing only
// updateFeed('./src/feed/');

module.exports = updateFeed;