import React, { Component } from 'react';
import DatePicker from 'react-date-picker'; 
import * as staticFeedAPI from '../api/static-feed';
import dateHelpers from '../../server/utils/dateHelpers';

class NextSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			serviceIDs: [],
			trips: [],
			routes: [],
			stops: {0:[],1:[]},
			directions: [],
			route: null,
			stop: null,
			direction: null,
			date: new Date(),
			numResults: 3
		};

		this.handleRouteSelect = this.handleRouteSelect.bind(this);
		this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
		this.handleDatePicker = this.handleDatePicker.bind(this);
		this.handleStopSelect = this.handleStopSelect.bind(this);
		this.getServiceIDs = this.getServiceIDs.bind(this);
		this.getTrips = this.getTrips.bind(this);
		this.getStopsByDirection = this.getStopsByDirection.bind(this);

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
		if (this.state.stops[0].length < 1 ) {
			this.getStopsByDirection(0);
		}
		if (this.state.stops[1].length < 1) {
			this.getStopsByDirection(1);
		}

	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log("nextProps ",nextProps);
	// 	console.log("nextState", nextState);
	// 	console.log("this.props ",this.props);
	// 	console.log("this.state ",this.state);
	// 	return true;
	// }

	componentDidUpdate () {

	}

	getServiceIDs() {
		let d;
		if (!this.state.date) {
			d = new Date();
		} else {
			d = this.state.date;
		}
		d = dateHelpers.convertDateObjToLocalISOString(d);
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

	getTrips() {
		let d;
		if (!this.state.date) {
			d = new Date();
		} else {
			d = this.state.date;
		}
		d = dateHelpers.convertDateObjToLocalISOString(d);
		staticFeedAPI.getTrips(d, this.state.route,this.state.direction,this.state.serviceIDs)
		.then( results => {
			console.log("results from getTrips fetch ",results);
			this.setState({trips: results.trips}, () => this.getStops() );
		})
		.catch(err => {
			console.log("err in getTrips:", err);
			this.setState({ trips: [] });
		})
	}

	getStopsByDirection(dir=this.state.direction) {
		console.log("dir ",dir);
		console.log("this.state.stops[dir].length ",this.state.stops[dir].length);
		staticFeedAPI.getStopsByDirection(dir)
		.then( results => {
			console.log("results from staticFeedAPI.getStopsByDirection ",results);
			this.setState({ stops: [dir] = results.stops});
		})
		.catch( err => {
			console.log("err in staticFeedAPI.getStopsByDirection ",err);
			this.setState({stops: [dir] = []});
		})
	}

	handleRouteSelect(e) {
		this.setState({route: e.target.value});
		this.state.routes.map(item => {
			if (item.route_id === e.target.value) {
				this.setState({directions: item.directions}, function() {
					this.setState({direction: "0"}, function() {
						this.getTrips();
					});					
				});
				return;
			}
		});
	}

	handleDirectionSelect(e) {
		this.setState({direction: e.target.value}, function() {
			this.getTrips();
		});

	}

	handleDatePicker(d) {
		this.setState({date: d}, this.getServiceIDs)
	}

	handleStopSelect(e) {
		this.setState({stop: e.target.value});
	}


	render() {
		let routesLoaded = this.state.routes.length;
		let routeChosen = this.state.route;
		let directionChosen = this.state.direction;

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
							{this.state.directions.map((item,index) => 
								<option key={item} value={index}>{item}</option>
							)}
						</select>
					</div>
					)	
				}
				{
					directionChosen && (
					<div>
						<label htmlFor="stop-select">Choose a Stop: </label>
						<select 
							id="stop-select" 
							title="Select your direction" 
							value={this.state.stop || ""}
							onChange={this.handleStopSelect} >
							{this.state.stops.map((item,index) => 
								<option key={item.stop_id} value={item.stop_id}>{item.name}</option>
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