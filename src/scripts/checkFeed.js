const fetch = require('node-fetch'),
	mainFeedUrl = "http://www.rtd-denver.com/GoogleFeeder/",
	lastModifiedFile = "./lastModified.json",
	lastModifiedDate = require('./lastModifiedDate');

function handleFetchErrors(res) {
	let errMsg;
	if (!res.ok) {
		errMsg = `There was an error fetching ${res.url}. Error: ${res.status} ${res.statusText}`;
		throw Error(errMsg);
	}
	return res;
}


function parseDateFromHTML(html) {
	let 	test = /\d{2}.\w{3}.\d{4}\s*\d{2}\:\d{2}/,	
			temp = html,
			start = temp.indexOf('google_transit.zip'),
			end = temp.indexOf('</tr', start),
			date = "";
	temp = temp.substring(start,end);
	if (temp.match(test)) {
		date = temp.match(test)[0];
	} else {
		throw Error("No date found in HTML");
	}
	console.log("date ",date);
	return date;
}

function getFeedDate(url) {
	return fetch(url)
		.then(handleFetchErrors)
		.then((res) => {
			console.log("res.status ",res.status);
			return res.text();
		})
		// .then((body) => {
		// 	// console.log("body ",body);
		// 	let feedDate = parseDateFromHTML(body);
		// 	console.log("feedDate ",feedDate);
		// 	return feedDate;
		// })
		.catch((err) => {
			console.log("fetch err", err);
			return err;
		});
}

function checkFeed(url) {
	let lastModified, feedDate, needUpdate;
	let file = lastModifiedDate.getLastModified(lastModifiedFile);
	let html = getFeedDate(url);
	// html.then((body) => {
	// 	feedDate = parseDateFromHTML(body)
	// });
	Promise.all([html, file])
		.then(values => console.log("values ",values));
}

checkFeed(mainFeedUrl);