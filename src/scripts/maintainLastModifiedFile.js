let 	file = "./lastModified.json",
		fs = require('fs');

function getLastModified() {
	fs.readFile(file,'utf8', (err,data) => {
		if (err) {
			console.log("err ",err);
			return "Error getting last modified date";
		}
		let obj = JSON.parse(data);
		return obj.lastModified.date;
	});
}

function updateLastModified(newDate) {
	let obj = {"lastModified":{"date":newDate}};
	obj = JSON.stringify(obj);
	fs.writeFile(file,obj,'utf8', (err) => {
		if (err) {
			console.log("Err updating last modified file");
			return;
		}
		console.log("lastModified.json updated");
	});
}

// getLastModified();
// updateLastModified("");