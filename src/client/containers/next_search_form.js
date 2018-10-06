import React, { Component } from 'react';
import * as staticFeedAPI from '../api/static-feed';

class NextSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
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
		if (!this.state.serviceIDs) {
			this.setState(serviceIDs: staticFeedAPI.getServiceIDs(new Date()))
		}
	}


	render() {
		return (
			<p>Service IDs: {this.state.serviceIDs}</p>
			<p>Routes: {this.state.routes}</p>
			// <form>
				// <label for="stop-location">Stop Loction</label>
				// <select 
					// id="stop-location" 
					// type="text" 
					// value={this.state.stopLocation} 
					// onChange=""
					// title="Select Your Stop Location"> 
				// </select>
			// </form>
		);
	}

}

export default NextSearchForm;