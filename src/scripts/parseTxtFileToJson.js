const fs = require('fs'),
		readline = require('readline'),
		stream = require('stream');
		// readFile = require('fs-readfile-promise');

// Originally we read entire file into memory, parsed it to a JS obj, that we then converted to JSON via 
// JSON.stringify; however, this caused an out of memory err since some of the feed files are so large.
// This approach should work fine with a db if we are just passing a JS obj.
// Here we'll rewrite this as a stream where we create a very large string that we will then write to a 
// file via another stream. Also, we'll attempt to wrap this all in a promise.
// May want to refactor to async stream: https://coderwall.com/p/ohjerg/read-large-text-files-in-nodejs
function parseTxtFileToJson (path) {
	let 	json = "",
			jsonPath = path.substring(0,path.lastIndexOf('/')+1) + "json/",
			dataName = path.substring(path.lastIndexOf('/')+1);
	dataName = dataName.substring(0,dataName.lastIndexOf('.'));
	console.log('jsonPath+dataName+".json"', jsonPath+dataName+".json");
	let 	keys,
			counter = 0,
			instream = fs.createReadStream(path),
			// outstream = new stream,
			outstream = fs.createWriteStream(jsonPath+dataName+".json"),
			rl = readline.createInterface(instream, outstream);
	json = `{"${dataName}":[`;
	console.log("json ",json);
	return new Promise((resolve,reject) => {
		rl.on('line', (line) => {
			if(counter === 0) {
				keys = convertLineToArray(line);		
				counter++;
				console.log("keys", keys);
			} else {
				let tempLine = convertLineToArray(line);
				if (tempLine && tempLine.length > 0) {
					if (keys.length === tempLine.length) {
						// lines[0] = keys
						json = json + "{"
						let len = keys.length,
							 i = 1;
						for (; i < len; i++){
							json = `${json}"${keys[i]}":"${tempLine[i]}"`
							if (i !== len-1) json = json + ",";
						}
					}
				}				
			}
		});
		rl.on('close', (data) => {
			console.log("data ",data);
			json = json + "]}";
			console.log("json ",json);
		})
	}, (err) => {

	})
		// .then((file) => {
		// 	let keys;
		// 	lines = file.toString().split('\r\n');

		// 	if (lines && lines.length > 0) {
		// 		// first line shoule be the keys
		// 		keys = convertLineToArray(lines[0]);
		// 		for (let i = 1; i < lines.length; i++) { 
		// 			if (lines[i].length === 0) {
		// 				lines.splice(i,1);
		// 			} else {
		// 				lines[i] = convertLineToArray(lines[i]);						
		// 			}
		// 		}
		// 	}
		// 	let json = convertLinesToJSON(lines,keys,dataName);
		// 	return ({parseTxtFileSuccess: true, data: json});
		// })
		// .catch((err) => {
		// 	console.log(err);
		// 	let errMsg = `Error in parseTxtFileToJson readFile: err.code=${err.code} on file ${err.path}.`;
		// 	console.log("errMsg ",errMsg);
		// 	return ({parseTxtFileSuccess: false, data: errMsg});
		// })
}


function convertLinesToJSON(lines,keys,dataName) {
	// let arr = [];
	let jsonObj = {[dataName]:[]};
	console.log("convertLinesToJson called on dataName ",dataName);
	if (lines && lines.length > 0) {
		let 	len = lines.length, 
				i = 1;
		for (; i < len; i++) {
			let temp = convertLineToObj(lines[i],keys);
			jsonObj[dataName].push(temp);
			// arr.push(temp);
		}
	}
	// console.log("arr ",arr);
	// jsonObj = {[dataName]: arr};
	// return JSON.stringify(jsonObj);
	return jsonObj;
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
// let json = parseTxtFileToJson('./src/feed/routes.txt');
// console.log("type of json.then ",typeof json.then);
parseTxtFileToJson('./src/feed/agency.txt');

module.exports = parseTxtFileToJson;