const	dir = require('path-reader'),
		parseTxtFileToJson = require('./parseTxtFileToJson');

function updateFeed(path) {
	dir.promiseFiles(path)
		.then((files) => {
			console.log("files ",files);
		})
}

updateFeed('./src/feed/');