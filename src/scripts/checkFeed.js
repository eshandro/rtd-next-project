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
	return date;
}

function getFeedDate(url) {
	return fetch(url)
		.then(handleFetchErrors)
		.then((res) => {
			console.log("res.status ",res.status);
			return res.text();
		})
		.then((body) => {
			// console.log("body ",body);
			let feedDate = parseDateFromHTML(body);
			return feedDate;
		})
		.catch((err) => {
			console.log("fetch err", err);
			return err;
		});
}

function checkFeed(url) {
	let lastModified, feedDate, needUpdate;
	let fileDate = lastModifiedDate.getLastModified(lastModifiedFile);
	let htmlDate = getFeedDate(url);

	Promise.all([htmlDate, fileDate])
		.then((values) => {
			console.log("values ",values);
			let checkFeedErr = '';
			if (typeof values[0] === "object" || !values[0] || values[0] === '')
				checkFeedErr += 'checkFeed error getting HTML Date';		
			if (typeof values[1] !== 'string' || values[1].indexOf('Error') !== -1) {
				if(checkFeedErr !== '') {
					checkFeedErr += 'and error getting File Date';
				} else {
					checkFeedErr += 'checkFeed error getting File Date';
				}
			}
			if (checkFeedErr) {
				console.log("checkFeedErr ",checkFeedErr);
				return {needUpdate: false, msg: checkFeedErr};
			}
			if (values[0] !== values[1]) {
				lastModifiedDate.updateLastModified(lastModifiedFile, values[0]);
				return {needUpdate: true, msg: "Feed has been updated"};
			} else {
				return {needUpdate: false, msg: "Feed has NOT been updated"}
			}
		})
		.catch(reason => console.log('Error in checkFeed Promise.all', reason));
}

checkFeed(mainFeedUrl);