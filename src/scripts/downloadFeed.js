const	fs = require('fs'), 
		url = require('url'),
		fetch = require('node-fetch'),
		handleFetchErrors = require('./handleFetchErrors');
let 	file_name = '', destPath;

function downloadFeed(fileUrl, apiPath) {
	let 	p = url.parse(fileUrl),
			file,
			timeout = 50000;
	file_name = p.pathname.substring(p.pathname.lastIndexOf('/')+1);
	destPath = apiPath + file_name;
	
	// You can pass options as a 2nd param, e.g. {timeout: #}
	// NOTE: options only work on standard fetch api, i.e. not on res.buffer
	return fetch(fileUrl, {timeout:timeout})
		.then(handleFetchErrors)
		.then((res) => {
			console.log("res.status in downloadFeed fetch",res.status);
			let len = res.headers.get('content-length');
			console.log("len ",len);
			if (!len) {
				return Promise.reject({downloadFeedSuccess: false, msg: "No data received"})
			}
			// if you prefer to cache binary data in full, use buffer()
			// note that buffer() is a node-fetch only API
			// return res.buffer();
			let 	file = fs.createWriteStream(destPath),
					timer;

			return new Promise((resolve, reject) => {
				const errorHandler = (error) => {
			   	let errMsg = "Unable to download file: " + error;
			   	reject({downloadFeedSuccess: false, msg: errMsg})
			   	// throw Error(errMsg);
				};

				res.body.pipe(file);

				file
			   	.on('open', () => {
			   		console.log("file.on open");
			      	timer = setTimeout(() => {
			      		// End stream and delete file
			      		// file.close();
			      		file.end(() => { fs.unlinkSync(destPath)});
			      		reject({downloadFeedSuccess: false, msg: 'Timeout writing file'})
			      	}, timeout)
			   	})
			   	.on('error', errorHandler)
			   	.on('finish', () => {
			   		console.log("file.on finish")
			    		resolve(destPath)
			   	})
			})
			.then((dest) => {
				console.log("dest ",dest);
				clearTimeout(timer);
				return ({downloadFeedSuccess:true, msg:destPath});
			}, (err) => {
				clearTimeout(timer);
				// End stream and delete file
				if(file) {
					// file.close();
					file.end(() => { fs.unlinkSync(apiPath+file_name)});
				}				
				return Promise.reject(err)
			})
		})
		// .then((buffer) => {
		// 	return fs.writeFile(apiPath+file_name, buffer, 'utf-8', (err) => {
		// 		if (err) {
		// 			return Promise.resolve({downloadFeedSuccess: false, msg: "Error writing file: " + err})
		// 		}
		// 		return Promise.resolve({downloadFeedSuccess:true, msg:apiPath+file_name});
		// 	})
		// })
		.catch((err) => {
			console.log("fetch err in downloadFeed", err);
			// End stream and delete file  
			if(file) {
				file.end(() => { fs.unlinkSync(apiPath+file_name)});
			}
			// check if error is fetch timeout error
			if (err.type && err.type === 'request-timeout') {
				return ({downloadFeedSuccess: false, msg: err.message});
			} else {
				return err;
			} 
		});
}
// Testing only
downloadFeed("http://httpstat.us/200?sleep=1000", "./src/testing-files/");
// downloadFeed("http://www.rtd-denver.com/GoogleFeeder/google_transit.zip", "./src/testing-files/");

module.exports = downloadFeed;
