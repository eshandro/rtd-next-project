const fs = require('fs'),
		readline = require('readline');


// May want to refactor to async stream: https://coderwall.com/p/ohjerg/read-large-text-files-in-nodejs

function parseTxtFileToJS (path) {
	let 	keys,
			counter = 0,
			tempArr = [],
			dataName = path.substring(path.lastIndexOf('/')+1);
	
	// jsonPath = path.substring(0,path.lastIndexOf('/')+1) + "json/";
	dataName = dataName.substring(0,dataName.lastIndexOf('.'));

	let	instream = fs.createReadStream(path),
			// file = fs.createWriteStream(jsonPath+dataName+".json"),
			rl = readline.createInterface(instream);

	return new Promise((resolve,reject) => {
		const errorHandler = (error) => {
			console.log("errorHandler in parseTxtFileToJson rl promise");
			let errMsg = `Unable to read file ${path}:  ${error}`;
			reject({parseTxtFileSuccess: false, data: errMsg})
		};
		rl
			.on('line', (line) => {
				if(counter === 0) {
					keys = convertLineToArray(line);		
					console.log("keys", keys);
				} else {
					let currLine = convertLineToArray(line);
					if (currLine && currLine.length > 0) {
						// if (keys.length === currLine.length) {
						// 	if(counter > 1) {
						// 		currJson = ",\n";
						// 	} else {
						// 		currJson = "\n";
						// 	}
						// 	let len = keys.length,
						// 		 i = 0;
						// 	for (; i < len; i++){
						// 		if (i === 0) {
						// 			currJson = `${currJson}\t{`;
						// 		}
						// 		currJson = `${currJson}"${keys[i]}":"${currLine[i]}"`
						// 		if (i !== len-1) {
						// 			currJson = currJson + ",";
						// 		} else if (i === len-1) {
						// 			currJson = currJson + "}"
						// 		}
						// 	}
						// }
						tempArr.push(convertLineToObj(currLine,keys));
					}
				}
				counter++;				
			})
			.on('error', errorHandler)
			.on('close', () => {
				// console.log("rl close event fired ");
				resolve({
					dataName: tempArr
				});
			});
	
	})
	.then((jsObj) => {
		console.log("jsObj ",jsObj.dataName[1]);
		return({parseTxtFileSuccess: true, data: jsObj});
	}, (err) => {
		return Promise.reject({parseTxtFileSuccess:false, data:err});
	})
}

// function parseTxtFileToJS (path) {
// 	let 	lines,
// 			dataName = path.substring(path.lastIndexOf('/')+1);
// 	dataName = dataName.substring(0,dataName.lastIndexOf('.'));
// 	return readFile(path, 'utf8')
// 		.then((file) => {
// 			let keys;
// 			lines = file.toString().split('\r\n');

// 			if (lines && lines.length > 0) {
// 				// first line shoule be the keys
// 				keys = convertLineToArray(lines[0]);
// 				for (let i = 1; i < lines.length; i++) { 
// 					if (lines[i].length === 0) {
// 						lines.splice(i,1);
// 					} else {
// 						lines[i] = convertLineToArray(lines[i]);						
// 					}
// 				}
// 			}
// 			let json = convertLinesToJS(lines,keys,dataName);
// 			return ({parseTxtFileSuccess: true, data: json});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			let errMsg = `Error in parseTxtFileToJson readFile: err.code=${err.code} on file ${err.path}.`;
// 			console.log("errMsg ",errMsg);
// 			return ({parseTxtFileSuccess: false, data: errMsg});
// 		})
// }

function convertLinesToJS(lines,keys,dataName) {
	let feedObj = {[dataName]:[]};
	console.log("convertLinesToJson called on dataName ",dataName);
	if (lines && lines.length > 0) {
		let 	len = lines.length, 
				i = 1;
		for (; i < len; i++) {
			let temp = convertLineToObj(lines[i],keys);
			feedObj[dataName].push(temp);
		}
	}
	return feedObj;
}

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
	return obj;
}

// For testing only
// let json = parseTxtFileToJson('google_transit/routes.txt');
// console.log("type of json.then ",typeof json.then);
parseTxtFileToJS('google_transit/stop_times.txt');

module.exports = parseTxtFileToJS;