import React, { Component } from 'react';
// import getServicesIdsForDate from '../../../database/queries/getServiceIdsForDate';

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



	render() {
		return (
			<form>
				<label for="stop-location">Stop Loction</label>
				<select 
					id="stop-location" 
					type="text" 
					value={this.state.stopLocation} 
					onChange=""
					title="Select Your Stop Location"> 
				</select>
			</form>
		);
	}

}

export default NextSearchForm;