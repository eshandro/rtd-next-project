var fs = require('fs');

// May want to refactor to async stream: https://coderwall.com/p/ohjerg/read-large-text-files-in-nodejs
function getLines (path) {
	var lines;
	fs.readFile(path, 'utf8', function(err, file) {
		if (err) throw err;
		lines = file.toString().split('\r\n');
		if (lines && lines.length > 0) {
			// first line shoule be skipped
			for (let i = 1; i < lines.length; i++) {
				lines[i] = convertLineToArray(lines[i]);
			}
		}
		console.log("convertToJSON(lines) ",convertToJSON(lines));
		return convertToJSON(lines);
	});
}
function convertLineToArray (line) {
	return line.split(',');
}

// Each route has the following:
// route_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color
function convertLineToObj (line) {
	var obj = {};
	if (line && line.length > 0) {
		obj = {
			"route_id": line[0],
			"route_short_name": line[1],
			"route_long_name": line[2],
			"route_desc": line[3],
			"route_type": line[4],
			"route_url": line[5],
			"route_color": line[6],
			"route_text_color": line[7]
		};
	}
	return obj;
}

function convertToJSON(lines) {
	var jsonObj = {routes:[]};
	if (lines && lines.length > 0) {
		let 	len = lines.length, 
				i = 0;
		for (; i < len; i++) {
			let temp = convertLineToObj(lines[i]);
			jsonObj.routes.push(temp);
		}
	}
	return JSON.stringify(jsonObj);
}

getLines('google_transit/routes.txt');