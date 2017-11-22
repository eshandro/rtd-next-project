const	fs = require('fs'), 
		url = require('url'),
		http = require('http'),
		fetch = require('node-fetch'),
		handleFetchErrors = require('./handleFetchErrors');
let 	file_name = '';

function downloadFeed(fileUrl, apiPath) {
	let 	p = url.parse(fileUrl),
			file,
			timeout = 500;
	file_name = p.pathname.substring(p.pathname.lastIndexOf('/')+1);
	
	return fetch(fileUrl, {timeout: timeout})
		.then(handleFetchErrors)
		.then((res) => {
			console.log("res.status in downloadFeed fetch",res.status);
			console.log("length in downloadFeed fetch", res.headers.get('content-length'));
			let len = res.headers.get('content-length')
			if (!len) {
				return ({downloadFeedSuccess: false, msg: "No data received"})
			}
			file = fs.createWriteStream(apiPath+file_name);
			// res.body.pipe(file);
			return ({downloadFeedSuccess:true, msg:"Download successful"});
		})
		.catch((err) => {
			console.log("fetch err in downloadFeed", err);
			// End stream and delete file  
			if(file) {
				file.end(() => { fs.unlinkSync(apiPath+file_name)});
			}
			// check if error is Timout error
			if (err.type && err.type === 'request-timeout') {
				return ({downloadFeedSuccess: false, msg: err.message});
			} else {
				return ({downloadFeedSuccess: false, msg: err});
			}         
		});
}
// Testing only
// downloadFeed("http://httpstat.us/200?sleep=1000", "./src/testing/");

module.exports = downloadFeed;
