const	fs = require('fs'),
		readFile = require('fs-readfile-promise');

function getLastModified(file) {
	return readFile(file,'utf8')
	.then((data) => {
		let obj = JSON.parse(data);
		console.log("obj.lastModified.date ",obj.lastModified.date);
		return obj.lastModified.date;
	})
	.catch((err) => {
		console.log("err in getLastModified",err);
		return "Error getting last modified date";
	});
}

function updateLastModified(file,newDate) {
	let obj = {"lastModified":{"date":newDate}};
	obj = JSON.stringify(obj);
	fs.writeFile(file,obj,'utf8', (err) => {
		if (err) {
			console.log("Error updating last modified file: " + err);
			return;
		}
		console.log("lastModified.json updated");
	});
}
module.exports = {
	getLastModified: getLastModified,
	updateLastModified: updateLastModified
}