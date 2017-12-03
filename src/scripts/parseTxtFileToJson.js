const fs = require('fs'),
		readFile = require('fs-readfile-promise');

// May want to refactor to async stream: https://coderwall.com/p/ohjerg/read-large-text-files-in-nodejs
function getLines (path) {
	let 	lines,
			dataName = path.substring(path.lastIndexOf('/')+1);
	dataName = dataName.substring(0,dataName.lastIndexOf('.'));
	return readFile(path, 'utf8')
		.then((file) => {
			let keys;
			lines = file.toString().split('\r\n');
			if (lines && lines.length > 0) {
				// first line shoule be the keys
				keys = convertLineToArray(lines[0]);
				console.log("keys ",keys);
				for (let i = 1; i < lines.length; i++) {
					lines[i] = convertLineToArray(lines[i]);
				}
			}
			// console.log("convertLinesToJSON(lines,keys,dataName) ",convertLinesToJSON(lines,keys,dataName));
			return convertLinesToJSON(lines,keys,dataName);
		})
		.catch((err) => {

		})
}

function convertLinesToJSON(lines,keys,dataName) {
	console.log("lines.length ",lines.length);
	console.log("keys.length ",keys.length);
	var jsonObj = {dataName:[]};
	console.log("jsonObj ",jsonObj);
	if (lines && lines.length > 0) {
		let 	len = lines.length, 
				i = 0;
		for (; i < len; i++) {
			let temp = convertLineToObj(lines[i]);
			jsonObj.dataName.push(temp);
			console.log("jsonObj in loop ",jsonObj);
		}
	}
	return JSON.stringify(jsonObj);
}

function convertLineToArray (line) {
	return line.split(',');
}

// Each route has the following:
// route_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color
function convertLineToObj (line, keys) {
	var obj = {};
	if (line && line.length > 0) {
		if (keys.length === line.length) {
			let len = keys.length,
				 i = 0;
			for (; i < len; i++){
				obj.keys[i] = line[i];
			}
			// obj = {
			// 	"route_id": line[0],
			// 	"route_short_name": line[1],
			// 	"route_long_name": line[2],
			// 	"route_desc": line[3],
			// 	"route_type": line[4],
			// 	"route_url": line[5],
			// 	"route_color": line[6],
			// 	"route_text_color": line[7]
			// };
		}
	}
	return obj;
}


getLines('google_transit/routes.txt');