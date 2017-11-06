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
			let 	test = /\d\d\-\w{3}\-\d{4}\s*\d{2}\:\d{2}/,	
					temp = body,
					start = temp.indexOf('google_transit.zip'),
					end = temp.indexOf('</tr', start),
					lastModified = "";
			temp = temp.substring(start,end);
			lastModified = temp.match(test);
			console.log("lastModified ",lastModified);
			return body;
		})
		.catch((err) => {
			console.log("fetchHTML err", err);
			return err;
		});
}

function getLastModifiedFromHTML(html) {

}

function getLastModified() {

}

function updateLastModified() {

}

function checkLastModified(mainFeedUrl) {
	let body;
	fetchHTML(mainFeedUrl);
	// .then((res) => {console.log("res ",res);});
			// .then((res) => {
		// 	console.log("res in checkLastModified ",res);
		// })
}
checkLastModified(mainFeedUrl);