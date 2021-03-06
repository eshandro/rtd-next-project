const		fs = require('fs');
const		unzipper = require('unzipper');

/**
 * unzips the static feed zip file
 * @param  {string} zippedFile Path of zip file
 * @param  {string} outputPath Path for unzipped files
 * @return {promise}            object {unzipSuccess: boolean, data: string}
 *                                     unzipSuccess: used to determine next step
 *                                     data: error or path to newly unzipped files
 */
function unzipFiles (zippedFile,outputPath) {
	console.log('zippedFile', zippedFile);
	console.log('outputPath', outputPath);
	
	return fs.createReadStream(zippedFile)
		// TODO: "value", May need to add in error handling here. For example, if no file exists. 
		// 		See downloadFeed for how might be implemented via new Promise
		.pipe(unzipper.Parse())
		.on('entry', entry => {
			// console.log("entry.type ",entry.type);
			// console.log("entry.path ",entry.path);
			// TODO: May want to add test here to be sure entry.type == file
			entry.pipe(fs.createWriteStream(outputPath+entry.path));
		})
		.on('finish', () => {
			// console.log('finish fired');
			fs.unlinkSync(zippedFile);
		})
		.promise()
		.then( () => {
			return ({unzipSuccess: true, msg:outputPath});
		}, (err) => {
			console.log('err in unzip ', err);
			return ({unzipSuccess: false, msg: 'Error unzipping files: ' + err});
		})
		.catch((err) => {
			console.log("catch is working");
			return ({unzipSuccess: false, msg: 'Error unzipping files: ' + err});
		});
}

// For testing only
// unzipFiles('./src/testing-files/google_transit.zip', './src/feed/');
// let files = unzipFiles('./src/temp-feed/google_transit.zip', './src/feed/');
// console.log(typeof files.then);
// console.log("files ",files);

module.exports = unzipFiles;