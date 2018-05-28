const 	fs = require('fs'),
		readline = require('readline'),
		StaticFeedData = require('./StaticFeedData');


function parseTxtFileToJS (path) {
	let keys,
		feedData,
		counter = 0,
		tempArr = [],
		dataName = path.substring(path.lastIndexOf('/')+1,path.lastIndexOf('.'));

	const	instream = fs.createReadStream(path),
			rl = readline.createInterface(instream);

	return new Promise((resolve,reject) => {
		const errorHandler = (error) => {
			console.log("errorHandler in parseTxtFileToJS rl promise");
			let errMsg = `Unable to read file ${path}:  ${error}`;
			reject({parseTxtFileSuccess: false, data: errMsg});
		};
		rl
		.on('line', (line) => {
			if (counter === 0) {
				keys = convertLineToArray(line);
				feedData = new StaticFeedData(dataName, keys);
				console.log("feedData ", feedData);
				// console.log("keys", keys);
			} else {
				let currLine = convertLineToArray(line);
				if (currLine && currLine.length > 0) {
					// tempArr.push(convertLineToObj(currLine,keys));
					feedData.addData(convertLineToObj(currLine, keys));
				}
			}
			counter++;
		})
		.on('error', errorHandler)
		.on('close', () => {
			resolve(feedData);
		});
	
	})
	.then((jsObj) => {
		console.log("jsObj.dataType ",jsObj.dataType);
		console.log("jsObj.data.length", jsObj.data.length);
		console.log("jsObj ",jsObj.data[1]);
		return({parseTxtFileSuccess: true, data: jsObj});
	}, (err) => {
		return Promise.reject({parseTxtFileSuccess:false, data:err});
	});
}


// function convertLinesToJS(lines,keys,dataName) {
// 	let feedObj = {[dataName]:[]};
// 	console.log("convertLinesToJson called on dataName ",dataName);
// 	if (lines && lines.length > 0) {
// 		let 	len = lines.length, 
// 				i = 1;
// 		for (; i < len; i++) {
// 			let temp = convertLineToObj(lines[i],keys);
// 			feedObj[dataName].push(temp);
// 		}
// 	}
// 	return feedObj;
// }

function convertLineToArray (line) {
	return line.split(',');
}

function convertLineToObj (line, keys) {
	var obj = {};
	if (line && line.length > 0) {
		if (keys.length === line.length) {
			// lines[0] = keys
			let len = keys.length,
				 i = 1;
			for (; i < len; i++){
				obj[keys[i]] = line[i];
			}
		}
	}
	return JSON.stringify(obj);
}

// For testing only
// let json = parseTxtFileToJson('google_transit/routes.txt');
// console.log("type of json.then ",typeof json.then);
// parseTxtFileToJS('google_transit/trips.txt');

module.exports = parseTxtFileToJS;