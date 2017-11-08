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
			// console.log("typeof res.text().then() ",typeof res.text().then == 'function');
			return res.text();
		})
		.then((body) => {
			parseLastModifiedFromHTML(body);
			return body;
		})
		.catch((err) => {
			console.log("fetch err", err);
			return err;
		});
}

function parseLastModifiedFromHTML(html) {
	let 	test = /\d{2}.\w{3}\.\d{4}\s*\d{2}\:\d{2}/,	
			temp = html,
			start = temp.indexOf('google_transit.zip'),
			end = temp.indexOf('</tr', start),
			lastModified = "";
	temp = temp.substring(start,end);
	lastModified = temp.match(test)[0];
	console.log("lastModified ",lastModified);
}

function getLastModified() {

}

function updateLastModified() {

}

function checkIfFeedUpdated(mainFeedUrl) {

}
checkIfFeedUpdated(mainFeedUrl);