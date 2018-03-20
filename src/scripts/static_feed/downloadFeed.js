const	fs = require('fs'), 
		url = require('url'),
		fetch = require('node-fetch'),
		handleFetchErrors = require('./handleFetchErrors');
let 	file_name = '', destPath;

/**
 * downloads the static feed zip file and streams it to temp download folder
 * @param  {string} fileUrl url to RTD's zip file
 * @param  {string} apiPath path to temp download folder
 * @return {promise}        object {downloadFeedSuccess: boolean, data: string}
 *                                 downloadFeedSuccess used to determine next step in application
 *                                 data: error message or path to newly downloaded zip file
 */
function downloadFeed(fileUrl, apiPath) {
	let 	p = url.parse(fileUrl),
			file,
			timeout = 300000; // 300000 ms = 5 minutes
	file_name = p.pathname.substring(p.pathname.lastIndexOf('/')+1);
	destPath = apiPath + file_name;
	
	// You can pass options as a 2nd param, e.g. {timeout: #}
	// NOTE: options only work on standard fetch api, i.e. not on res.buffer
	return fetch(fileUrl, {timeout:timeout})
	// return fetch(fileUrl)
		.then(handleFetchErrors)
		.then((res) => {
			// console.log("res.status in downloadFeed fetch",res.status);
			let len = res.headers.get('content-length');
			if (!len) {
				return Promise.reject({downloadFeedSuccess: false, data: "No data received"})
			}
			// if you prefer to cache binary data in full, use buffer()
			// note that buffer() is a node-fetch only API
			// return res.buffer();
			let 	file = fs.createWriteStream(destPath);
			res.body.pipe(file);
			let 	timer;
			return new Promise((resolve, reject) => {
				const errorHandler = (error) => {
					console.log("errorHandler in fs promise");
			   	let errMsg = "Unable to download file: " + error;
			   	reject({downloadFeedSuccess: false, data: errMsg})
				};

				file
			   	.on('open', () => {
			   		// console.log("open writestream in downloadFeed");
			      	timer = setTimeout(() => {
			      		console.log("timeout in fs promise");
			      		file.close();
			      		reject({downloadFeedSuccess: false, data: 'Timeout writing file'})
			      	}, timeout)
			   	})
			   	.on('error', errorHandler)
			   	.on('finish', () => {
			   		// console.log("finish writestream in downloadFeed");
			    		resolve(destPath)
			   	})
			})
			.then((dest) => {
				// console.log("dest ",dest);
				clearTimeout(timer);
				return ({downloadFeedSuccess:true, data:destPath});
			}, (err) => {
				clearTimeout(timer);
				// End stream and delete file
				if(file) {
					file.end(() => { fs.unlinkSync(destPath)});
				}				
				return Promise.reject(err)
			})
		})
		// .then((buffer) => {
		// 	console.log("buffer ",buffer);
		// 	return fs.writeFileSync(destPath, buffer, 'utf-8', (err) => {
		// 		if (err) {
		// 			return Promise.resolve({downloadFeedSuccess: false, msg: "Error writing file: " + err})
		// 		}
		// 		return Promise.resolve({downloadFeedSuccess:true, msg:destPath});
		// 	})
		// })
		.catch((err) => {
			console.log("fetch err in downloadFeed", err);
			// End stream and delete file  
			if(file) {
				file.end(() => { fs.unlinkSync(destPath)});
			}
			// check if error is fetch timeout error
			if (err.type && (err.type === 'request-timeout' || err.type === 'body-timeout')) {
				return ({downloadFeedSuccess: false, data: err.message});
			} else if (typeof err.downloadFeedSuccess === 'undefined') { // handle error thrown by handleFetchErrors
				return ({downloadFeedSuccess: false, data: err})
			} else {
				return err;
			}
		});
}
// Testing only
// downloadFeed("http://httpstat.us/200?sleep=1000", "./src/testing-files/");
// downloadFeed("http://www.rtd-denver.com/GoogleFeeder/google_transit.zip", "./src/testing-files/");

module.exports = downloadFeed;
