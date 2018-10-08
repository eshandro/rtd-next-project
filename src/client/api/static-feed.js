import config from '../config';

const staticfeedBaseUrl = config.staticFeedAPIURLBase;

export function getServiceIDs(date) {
	return fetch(staticfeedBaseUrl + 'services/serviceids_by_date/' + date)
	.then((result) => {
		return result;
	})
	.catch((err) =>  err)
}