import config from '../config';

const staticfeedBaseUrl = config.staticFeedAPIURLBase;

export function getServiceIDs(date) {
	return fetch(staticfeedBaseUrl + 'services/serviceids_by_date/' + date)
		.then(res => res.json())
		.then((serviceIDs) => {
			return serviceIDs;
		})
		.catch((err) =>  err)
}

export function getRoutesList() {
	return fetch(staticfeedBaseUrl + 'routes/routes_list')
		.then(res => res.json())
		.then(routes =>  routes)
		.catch(err => err)
}