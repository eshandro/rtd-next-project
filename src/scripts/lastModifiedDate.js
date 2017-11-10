let	fs = require('fs');

function getLastModified(file) {
	fs.readFile(file,'utf8', (err,data) => {
		if (err) {
			console.log("err ",err);
			return "Error getting last modified date";
		}
		let obj = JSON.parse(data);
		console.log("obj.lastModified.date ",obj.lastModified.date);
		return obj.lastModified.date;
	});
}

function updateLastModified(newDate) {
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