const	dir = require('path-reader'),
		fs = require('fs'),
		// parseTxtFileToJS = require('./parseTxtFileToJS');
		parseTxtFileToJson = require('./parseTxtFileToJson');

// function updateFeed(path) {
// 	dir.promiseFiles(path,{
// 		shortName:false,
// 		recursive:false,
// 		// match: /\.txt$/,
// 		// exclude: /^\./
// 		})
// 		.then((files) => {
// 			// Neither match or exclude options seem to be working to filter out .DS_Store etc files
// 			files = files.filter((file) => {
// 				return file.indexOf('.txt') !== -1
// 			});
// 			// console.log("files ",files);
// 			let i = 0, len = files.length;
// 			for (; i < len; i++) {
// 				let fullPath = './'+files[i];
// 				// console.log("fullPath ",fullPath);
// 				let js = parseTxtFileToJS(fullPath);
// 				json.then((data) => {
// 					if (data.parseTxtFileSuccess) {
// 						// Here we'll write feed obj to db
// 					}
// 				}).catch((err) => {
// 					console.log('Error in updateFeed:', err);
// 				})
// 			}
// 		})
// }

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
				// let json = parseTxtFileToJson(fullPath);
				// json.then((data) => {
				// 	if (data.parseTxtFileSuccess) {
				// 		let jsonPath = fullPath.substring(0,fullPath.lastIndexOf('/')+1) + 'json/' + fullPath.substring(fullPath.lastIndexOf('/')+1);
				// 		// let json = JSON.stringify(data.data);
				// 		let jsonStream = data.data;
				// 		writeJsonFile(jsonPath,jsonStream)
				// 	}
				// }).catch((err) => {
				// 	console.log('Error in updateFeed:', err);
				// })
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

function writeJsonFile(filePath, jsonStream) {
	filePath = convertFileExt(filePath,'json');
	let file = fs.createWriteStream(filePath);
	jsonStream.pipe(file);
	file
		.on('open', () => {
			console.log("file open event -", filePath);
		})
		.on('finish', () => {
			console.log("file finish event -", filePath);
		})
	// fs.writeFile(file, json, 'utf-8', (err) => {
	// 	if (err) {
	// 		let errMsg = `Error writing json file ${path}: ${err}`;
	// 		throw errMsg
	// 	}
	// 	console.log(`${file} written successfully`);
	// });
}

function convertFileExt(file, newExt) {
	let newFile = '';
	newFile = file.substring(0, file.lastIndexOf('.')+1) + newExt;
	return newFile;
}

// For testing only
// updateFeed('./src/feed/');

module.exports = updateFeed;