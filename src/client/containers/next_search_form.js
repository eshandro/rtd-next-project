import React, { Component } from 'react';
import * as staticFeedAPI from '../api/static-feed';

class NextSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			thing: "hello",
			serviceIDs: [],
			tripIDs: [],
			routes: [],
			stopLocaton: null,
			route: null,
			direction: null,
			numResults: 3
		};
	}

	componentDidMount () {
		if (this.state.serviceIDs.length < 1) {
			let d = new Date();
			d = d.toISOString();
			staticFeedAPI.getServiceIDs(d)
			.then((result) => {
				console.log("serviceids: ", result); 
				this.setState({ serviceIDs: result.serviceids });
			})
			.catch((err) => {
				console.log("err in serviceIDs get:", err);
				this.setState({serviceIDs: []})
			})
		}
		if (this.state.routes.length < 1) {
			staticFeedAPI.getRoutesList()
			.then((result) => {
				console.log("routes: ", result); 
				this.setState({ routes: result.routesList });
			})
			.catch((err) => {
				console.log("err in routes get:", err);
				this.setState({routes: []})
			})
		}

	}


	render() {
		const routesLoaded = this.state.routes.length;
		return (
			<div>
				<h2>Next Train!</h2>
				<form> 
						<label htmlFor="route-select">Choose Route</label>
						<select 
							id="route-select" 
							title="Select your route" >
						{this.state.routes.map((item) => 
							<option key={item._id} value={item.route_id}>{item.shortName} ({item.name})</option>
						)}
						</select>
				</form>
			</div>
			// <form>
				// <label for="stop-location">Stop Loction</label>
				// <select 
					// id="stop-location" 
					// value={this.state.stopLocation} 
					// onChange=""
					// title="Select Your Stop Location"> 
				// </select>
			// </form>
		);
	}

}

export default NextSearchForm;