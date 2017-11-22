const fetch = require('node-fetch'),
		handleFetchErrors = require('./handleFetchErrors'),
		lastModifiedFile = "./lastModified.json",
		lastModifiedDate = require('./lastModifiedDate');


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
	let fileDatePromise = lastModifiedDate.getLastModified(lastModifiedFile);
	let htmlDatePromise = getFeedDate(url);

	return Promise.all([htmlDatePromise, fileDatePromise])
		.then((values) => {
			// console.log("values in checkFeed:",values);
			let htmlDate = values[0], fileDate = values[1];
			let checkFeedErr = '';
			if (typeof htmlDate === "object" || !htmlDate || htmlDate === '')
				checkFeedErr += 'checkFeed error getting HTML Date';		
			if (typeof fileDate !== 'string' || fileDate.indexOf('Error') !== -1) {
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
			if (htmlDate !== fileDate) {
				lastModifiedDate.updateLastModified(lastModifiedFile, htmlDate,fileDate);
				return {needUpdate: true, msg: "Feed has been updated"};
			} else {
				return {needUpdate: false, msg: "Feed has NOT been updated"}
			}
		})
		.catch(reason => console.log('Error in checkFeed Promise.all', reason));
}

// checkFeed(mainFeedUrl);

module.exports = checkFeed;