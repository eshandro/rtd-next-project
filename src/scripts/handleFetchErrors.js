function handleFetchErrors(res) {
	let errMsg;
	if (!res.ok) {
		errMsg = `There was an error fetching ${res.url}. Error: ${res.status} ${res.statusText}`;
		throw Error(errMsg);
	}
	return res;
}

module.exports = handleFetchErrors;