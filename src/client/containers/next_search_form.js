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
				console.log("result: ", result); 
				this.setState({ serviceIDs: result.serviceids });
			})
		}
	}


	render() {
		const len = this.state.serviceIDs.length;
		return (
			<div>
				{ 
					!len 
					? 'Loading...'
					: (
						<p>First Service ID: {this.state.serviceIDs[0]}</p>
					) 
				}
			</div>
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