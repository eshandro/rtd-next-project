const		fs = require('fs');
const 	extract = require('extract-zip');
const		decompress = require('decompress');
const		decompressUnzip = require('decompress-unzip');
const		unzipper = require('unzipper');

function unzipFiles (zippedFile,outputPath) {
	// if (zippedFile.substring(zippedFile.lastIndexOf('.')+1) !== 'zip') {
	// 	return Promise.resolve({unzipSuccess: false, msg:".zip file not passed to unzip"});
	// }
	// console.log("zippedFile ",zippedFile);
	// console.log("outputPath ",outputPath);
	// return extract(zippedFile, {dir:outputPath}, function(err){
	// 	if (err) {
	// 		console.log("err in extract ",err);
	// 		return Promise.resolve({unzipSuccess: false, msg: 'Error unzipping files: ' + err});
	// 	}
	// 	console.log("extract successful");
	// 	return Promise.resolve({unzipSuccess: true, msg:"Files unzipped successfully"});
	// });
	// return decompress(zippedFile, outputPath, {plugins:[decompressUnzip()]})
	// 	.then((files) => {
	// 		// console.log('unzipped',files);
	// 	})
	// 	.catch(err => console.log(err));

	return fs.createReadStream(zippedFile)
		.pipe(unzipper.Parse())
		.on('entry', entry => {
			console.log("entry.type ",entry.type);
			console.log("entry.path ",entry.path);
			entry.pipe(fs.createWriteStream(outputPath+entry.path))
		})
		.promise()
		.then( () => {
			return ({unzipSuccess: true, msg:"Files unzipped successfully"});
		}, (err) => {
			console.log('err in unzip ', err);
			return ({unzipSuccess: false, msg: 'Error unzipping files: ' + err});
		})
}

// For testing only
// unzipFiles('./src/testing-files/google_transit.zip', './src/feed/');
// let files = unzipFiles('./src/temp-feed/google_transit.zip', './src/feed/');
// console.log(typeof files.then)

module.exports = unzipFiles;