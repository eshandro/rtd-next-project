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

function fetchHTML(url) {
	fetch(url)
		.then(handleFetchErrors)
		.then((res) => {
			console.log("res.status ",res.status);
			return res.text();
		})
		.then((body) => {
			return body;
		})
		.catch((err) => {
			return err;
		});
}

function checkLastModified(mainFeedUrl) {
	let body;
	let data = fetchHTML(mainFeedUrl);
	data.then((res) => {console.log("res ",res);});
			// .then((res) => {
		// 	console.log("res in checkLastModified ",res);
		// })
}
checkLastModified(mainFeedUrl);