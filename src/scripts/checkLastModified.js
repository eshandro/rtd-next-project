const fetch = require('node-fetch'),
	mainFeedUrl = "http://www.rtd-denver.com/GoogleFeede/";

function checkLastModified(mainFeedUrl) {
	fetch(mainFeedUrl)
		.then((res) => {
			console.log("res.status ",res.status);
			return res.text();
		})
		.then((body) => {
			console.log("body ",body);
		})
		.catch((err) => {
			console.log("err ",err);
		});
}
checkLastModified(mainFeedUrl);