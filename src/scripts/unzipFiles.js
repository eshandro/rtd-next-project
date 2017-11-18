const 	extract = require('extract-zip');

function unzipFiles (unzip, msg) {
	console.log("unzip ",unzip);
	console.log("msg ",msg);
	if (!unzip) {
		return msg;
	}
	extract(msg, {dir:'./src/feed/'}, function(err){
		if (err) {
			console.log("err in extract ",err);
			return {unzipSuccessful: false, msg: 'Error unzipping files: ' + err};
		}
		console.log("extract successful ");
		return {unzipSuccessful: true, msg:"./src/feed/"}
	});
}

module.exports = unzipFiles;