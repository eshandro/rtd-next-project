const 	extract = require('extract-zip');

function unzipFiles (zippedFile,outputPath) {
	if (zippedFile.substring(zippedFile.lastIndexOf('.')+1) !== 'zip') {
		return Promise.resolve({unzipSuccess: false, msg:"No zippedFile passed to unzip"});
	}
	console.log("zippedFile ",zippedFile);
	console.log("outputPath ",outputPath);
	return extract(zippedFile, {dir:outputPath}, function(err){
		if (err) {
			console.log("err in extract ",err);
			return Promise.resolve({unzipSuccess: false, msg: 'Error unzipping files: ' + err});
		}
		console.log("extract successful");
		return Promise.resolve({unzipSuccess: true, msg:"Files unzipped successfully"});
	});
}

unzipFiles('./src/testing-files/google_transit.zip', './src/feed/')

module.exports = unzipFiles;