import config from '../config';

const staticfeedBaseUrl = config.staticFeedAPIURLBase;

export function getServiceIDs(date) {
	return fetch(`${staticfeedBaseUrl}services/serviceids_by_date/${date}`)
		.then(res => res.json())
		.then(serviceIDs => serviceIDs )
		.catch((err) =>  err);
}

export function getRoutesList() {
	return fetch(`${staticfeedBaseUrl}routes/routes_list`)
		.then(res => res.json())
		.then(routes =>  routes)
		.catch(err => err);
}

export function getTrips(date, route, direction, serviceids) {
	let data = {
		date,
		route,
		direction,
		serviceids
	};
	return fetch(`${staticfeedBaseUrl}trips/trips_by_date_route_direction`,{
		method: 'POST',
		headers: { 'Content-Type':'application/JSON'},
		body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(trips => trips)
		.catch(err => err);
}

export function getTripsIds(date, route, direction, serviceids) {
	let data = {
		date,
		route,
		direction,
		serviceids
	};
	return fetch(`${staticfeedBaseUrl}trips/tripsidslist_by_date_route_direction`,{
		method: 'POST',
		headers: { 'Content-Type':'application/JSON'},
		body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(trips => trips)
		.catch(err => err);
}

export function getStopsByIds(stopids) {
	let data = {
		stopids
	};
	return fetch(`${staticfeedBaseUrl}stops/stops_by_stopids`,{
		method: 'POST',
		headers: { 'Content-Type': 'application/JSON'},
		body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(stops => stops)
		.catch(err => err);
}

export function getStopByNameAndDirection(name,dir) {

	return fetch(`${staticfeedBaseUrl}stops/stop_by_name_direction/${name}/${dir}`,{
		method: 'GET',
		headers: { 'Content-Type': 'application/JSON'},
		})
		.then(res => res.json())
		.then(stop => stop)
		.catch(err => err);
}

export function getStopsByDirection(dir) {

	return fetch(`${staticfeedBaseUrl}stops/stops_by_direction/${dir}`)
		.then(res => res.json())
		.then(stops => stops)
		.catch(err => err);
}

export function getXStopTimesForStop(stopid, tripids, num) {
	let data = {
		stopid,
		tripids,
		num
	};

	return fetch(`${staticfeedBaseUrl}stoptimes/next_x_stoptimes_for_stop`, {
		method: 'POST',
		headers: {'Content-Type': 'application/JSON'},
		body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(results => results)
		.catch(err => err);
}