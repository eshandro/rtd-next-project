const fetch = require('node-fetch'),
	mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/";

function handleFetchErrors(res) {
	let errMsg;
	if (!res.ok) {
		errMsg = `There was an error fetching ${res.url}. Error: ${res.status} ${res.statusText}`;
		throw Error(errMsg);
	}
	return res;
}

function checkLastModified(mainFeedUrl) {
	fetch(mainFeedUrl)
		.then(handleFetchErrors)
		.then((res) => {
			console.log("res.status ",res.status);
			console.log("res ",res);
			return res.text();
		})
		.then((body) => {
			// console.log("body ",body);
		})
		.catch((err) => {
			console.log("err ",err);
		});
}
checkLastModified(mainFeedUrl);