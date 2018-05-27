const 	fs = require('fs'),
		readline = require('readline');
/**
 * parses text file to JSON and writes JSON to new file
 * @param  {string} path path to text file to be parsed
 * @return {promse}      object {parseTxtFileSuccess: boolean, data: string}
 *                              parseTxtFileSuccess: used to determine next step
 *                              data: error or path to newly created .json file
 */
function parseTxtFileToJson (path) {
	let 	keys,
			counter = 0,
			dataName = path.substring(path.lastIndexOf('/')+1);
	
	jsonPath = path.substring(0,path.lastIndexOf('/')+1) + "json/";
	dataName = dataName.substring(0,dataName.lastIndexOf('.'));
	
	let	instream = fs.createReadStream(path),
			file = fs.createWriteStream(jsonPath+dataName+".json"),
			rl = readline.createInterface(instream);

	return new Promise((resolve,reject) => {
		const errorHandler = (error) => {
			console.log("errorHandler in parseTxtFileToJson rl promise");
			let errMsg = `Unable to read file ${path}:  ${error}`;
			reject({parseTxtFileSuccess: false, data: errMsg});
		};
		rl
		.on('line', (line) => {
			let currJson = "";
			if (counter === 0) {
				keys = convertLineToArray(line);
				// console.log("keys", keys);
				currJson = `[`;
			} else {
				let currLine = convertLineToArray(line);
				if (currLine && currLine.length > 0) {
					if (keys.length === currLine.length) {
						if (counter > 1) {
							currJson = ",\n";
						} else {
							currJson = "\n";
						}
						let len = keys.length,
						i = 0;
						for (; i < len; i++) {
							if (i === 0) {
								currJson = `${currJson}\t{`;
							}
							currJson = `${currJson}"${keys[i]}":"${currLine[i]}"`;
							if (i !== len - 1) {
								currJson = currJson + ",";
							} else if (i === len - 1) {
								currJson = currJson + "}";
							}
						}
					}
				}
			}
			file.write(currJson);
			counter++;
		})
		.on('error', errorHandler)
		.on('close', () => {
			// console.log("rl close event fired ");
			file.write("\n]");
			file.end();
			fs.unlinkSync(path);
			resolve(jsonPath + dataName + ".json");
		});
	
	})
	.then((newFile) => {
		return({parseTxtFileSuccess: true, data: newFile});
	}, (err) => {
		return Promise.reject({parseTxtFileSuccess:false, data:err});
	});
}


function convertLineToArray (line) {
	return line.split(',');
}


// For testing only
// let json = parseTxtFileToJson('./src/feed/routes.txt');
// console.log("type of json.then ",typeof json.then);
// parseTxtFileToJson('./src/feed/calendar.txt');
// parseTxtFileToJson('./src/feed/shapes.txt');

module.exports = parseTxtFileToJson;