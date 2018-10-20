import React, { Component } from 'react';
import DatePicker from 'react-date-picker'; 
import * as staticFeedAPI from '../api/static-feed';
import dateHelpers from '../../server/utils/dateHelpers';

class NextSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			serviceIDs: [],
			tripIDs: [],
			routes: [],
			stops: [],
			directions: [],
			route: null,
			stopLocaton: null,
			direction: null,
			date: new Date(),
			numResults: 3
		};

		this.handleRouteSelect = this.handleRouteSelect.bind(this);
		this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
		this.handleDatePicker = this.handleDatePicker.bind(this);
		this.getServiceIDs = this.getServiceIDs.bind(this);
	}

	componentDidMount () {
		if (this.state.serviceIDs.length < 1) {
			this.getServiceIDs();
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

	componentDidUpdate () {

	}

	getServiceIDs() {
		let d;
		console.log("this.state.date in getServiceIDs ",this.state.date);
		if (!this.state.date) {
			d = new Date();
		} else {
			d = this.state.date;
		}
		d = dateHelpers.convertDateObjToLocalISOString(d);
		console.log("d after convertDateObjToLocalISOString ",d);
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

	handleRouteSelect(e) {
		this.setState({route: e.target.value});
		this.state.routes.map(item => {
			if (item.route_id === e.target.value) {
				this.setState({directions: item.directions});
			}
		});
	}

	handleDirectionSelect(e) {
		this.setState({direction: e.target.value});

	}

	handleDatePicker(d) {
		this.setState({date: d}, this.getServiceIDs)
	}


	render() {
		let routesLoaded = this.state.routes.length;
		let routeChosen = this.state.route;

		return (
			<div>
				<h2>Next Train!</h2>
				<form> 
					<div>
						<label htmlFor="date-picker">Date: </label>
						<DatePicker 
							id="date-picker" 
							type="text" 
							value={this.state.date} 
							onChange={this.handleDatePicker} >
						</DatePicker>
					</div>
				{ 
					!routesLoaded
					? 'Loading ...'
					: (
						<div>
							<label htmlFor="route-select">Choose Route: </label>
							<select 
								id="route-select" 
								title="Select your route" 
								value={this.state.route || ""} 
								onChange = {this.handleRouteSelect} >
								{this.state.routes.map(item => 
									<option key={item._id} value={item.route_id}>{item.shortName} ({item.name})</option>
								)}
							</select>
						</div>
					)
				}
				{
					routeChosen && (
					<div>
						<label htmlFor="direction-select">Choose Direction: </label>
						<select 
							id="direction-select" 
							title="Select your direction" 
							value={this.state.direction || ""}
							onChange={this.handleDirectionSelect} >
							{this.state.directions.map(item => 
								<option key={item} value={item}>{item}</option>
							)}
						</select>
					</div>
					)	
				}
				</form>
			</div>

		);
	}

}

export default NextSearchForm;