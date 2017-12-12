const fs = require('fs'),
		readline = require('readline'),
		Readable = require('stream').Readable;
		// readFile = require('fs-readfile-promise');

// Originally we read entire file into memory, parsed it to a JS obj, that we then converted to JSON via 
// JSON.stringify; however, this caused an out of memory err since some of the feed files are so large.
// This approach should work fine with a db if we are just passing a JS obj.
// Here we'll rewrite this as a stream where we create a very large string that we will then write to a 
// file via another stream. Also, we'll attempt to wrap this all in a promise.
// May want to refactor to async stream: https://coderwall.com/p/ohjerg/read-large-text-files-in-nodejs
function parseTxtFileToJson (path) {
	let 	keys,
			counter = 0,
			json = "",
			dataName = path.substring(path.lastIndexOf('/')+1);
	
	jsonPath = path.substring(0,path.lastIndexOf('/')+1) + "json/";
	dataName = dataName.substring(0,dataName.lastIndexOf('.'));
	
	let	instream = fs.createReadStream(path),
			outputStream = new Readable();
			// outstream = new stream,
			// file = fs.createWriteStream(jsonPath+dataName+".json"),
			// rl = readline.createInterface(instream, outstream);
			rl = readline.createInterface(instream);

	
	json = `{"${dataName}":[`;
	return new Promise((resolve,reject) => {
		const errorHandler = (error) => {
			console.log("errorHandler in parseTxtFileToJson rl promise");
			let errMsg = "Unable to read file: " + error;
			reject({parseTxtFileSuccess: false, data: errMsg})
		};
		rl
			.on('line', (line) => {
				if(counter === 0) {
					keys = convertLineToArray(line);		
					counter++;
					console.log("keys", keys);
					outputStream.push(json);
				} else {
					console.log("counter ",counter);
					let currLine = convertLineToArray(line);
					if (currLine && currLine.length > 0) {
						if (keys.length === currLine.length) {
							// lines[0] = keys
							let currJson = counter > 1 ? ",{" : "{";
							console.log("currJson",currJson)
							let len = keys.length,
								 i = 1;
							for (; i < len; i++){
								currJson = `${currJson}"${keys[i]}":"${currLine[i]}"`
								if (i !== len-1) {
									currJson = currJson + ",";
								} else if (i === len-1) {
									currJson = currJson + "}"
								}
							}
							outputStream.push(currJson);
						}
					}				
				}
			})
			.on('error', errorHandler)
			.on('close', () => {
				json = "]}";
				outputStream.push(json);
				outputStream.push(null);
				// console.log("json ",json);
				resolve(outputStream);
			});
		// file
		// 	.on('open', () => {
		// 		console.log("file open event")
		// 	})
		// 	.on('error', (err) => {
		// 		console.log("err in file", err);
		// 	})
		// 	.on('close', () => {
		// 		console.log("close in file")
		// 	})
	})
	.then((jsonStream) => {
		return({parseTxtFileSuccess: true, data: jsonStream});
	}, (err) => {
		return Promise.reject(err);
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