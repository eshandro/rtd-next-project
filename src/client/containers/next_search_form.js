import React, { Component } from 'react';
import DatePicker from 'react-date-picker'; 
import * as staticFeedAPI from '../api/static-feed';
import dateHelpers from '../../server/utils/dateHelpers';
import {stops} from '../../server/utils/globals';

class NextSearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			serviceIDs: [],
			trips: [],
			trips_ids: [],
			routes: [],
			stops_dir0: [],
			stops_dir1: [],
			directions: [],
			route: null,
			stop_name:null,
			stop: null,
			direction: null,
			date: new Date(),
			numResults: 3,
			stoptimes: [],
			canSearch: false
		};

		this.handleRouteSelect = this.handleRouteSelect.bind(this);
		this.handleDirectionSelect = this.handleDirectionSelect.bind(this);
		this.handleDatePicker = this.handleDatePicker.bind(this);
		this.handleStopSelect = this.handleStopSelect.bind(this);
		this.getServiceIDs = this.getServiceIDs.bind(this);
		this.getTrips = this.getTrips.bind(this);
		this.getTripsIdsList = this.getTripsIdsList.bind(this);
		this.getStopsByDirection = this.getStopsByDirection.bind(this);
		this.handleNumResultsInput = this.handleNumResultsInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentDidMount () {
		if (this.state.serviceIDs.length < 1) {
			this.getServiceIDs();
		}
		if (this.state.routes.length < 1) {
			staticFeedAPI.getRoutesList()
			.then((result) => {
				console.log("routes: ", result); 
				this.setState( { routes: result.routesList } );
				this.setState( { route: result.routesList[0].route_id } );
				this.setState( { directions: result.routesList[0].directions}, () => {
					this.setState( {direction: "0"}, () => {
						if (this.state.stops_dir0.length < 1) this.getStopsByDirection(0);
						if (this.state.stops_dir1.length < 1) this.getStopsByDirection(1);
						if (this.state.trips_ids.length < 1) this.getTripsIdsList();
					}) 
				});
			})
			.catch((err) => {
				console.log("err in routes get:", err);
				this.setState({routes: []});
			});
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
			this.setState({serviceIDs: []});
		});
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
			this.setState({trips: results.trips}, () => this.getStopsByDirection() );
		})
		.catch(err => {
			console.log("err in getTrips:", err);
			this.setState({ trips: [] });
		});
	}
	getTripsIdsList() {
		let d;
		if (!this.state.date) {
			d = new Date();
		} else {
			d = this.state.date;
		}
		d = dateHelpers.convertDateObjToLocalISOString(d);
		staticFeedAPI.getTripsIds(d, this.state.route,this.state.direction,this.state.serviceIDs)
		.then( results => {
			console.log("results from getTripsIds fetch ",results);
			this.setState({trips_ids: results.trips}, () => this.getStopsByDirection() );
		})
		.catch(err => {
			console.log("err in getTripsIds:", err);
			this.setState({ trips_ids: [] });
		});		
	}

	getStopsByDirection(dir=this.state.direction) {
		if(this.state.route) {
			let stateKey = "stops_dir" + dir;
			let stopsKey = this.state.route + '-' + dir;
			this.setState({ [stateKey]: stops[stopsKey] });
			if (dir == this.state.direction) {
				this.setState( { stop_name: this.state[stateKey][0] } );
				this.setState( { canSearch: true } );
			}
		}
	}

	handleRouteSelect(e) {
		this.setState({route: e.target.value});
		this.state.routes.map(item => {
			if (item.route_id === e.target.value) {
				this.setState({directions: item.directions}, function() {
					this.setState({direction: "0"}, function() {
						this.getTripsIdsList();
						this.getStopsByDirection();
						this.getStopsByDirection(this.state.direction == 0 ? "1" : "0")
					});					
				});
				return;
			}
		});
	}

	handleDirectionSelect(e) {
		this.setState({direction: e.target.value}, function() {
			this.getTripsIdsList();
		});

	}

	handleDatePicker(d) {
		this.setState({date: d}, this.getServiceIDs);
	}

	handleStopSelect(e) {
		let name = e.target.value;
		let dir = this.state.direction;
		this.setState({stop_name:name});
		staticFeedAPI.getStopByNameAndDirection(encodeURIComponent(name),dir)
		.then( stop => {
			this.setState( {canSearch: true})
			this.setState( {stop: stop.stop_id} );
		})
	}

	handleNumResultsInput(e) {
		this.setState( {numResults: e.target.value} );
	}

	handleSubmit(e) {
		e.preventDefault();
		let stopid;
		let tripsids = this.state.trips_ids;
		let num = this.state.numResults
		if (this.state.stop) {
			console.log("if");
			stopid = this.state.stop;
			console.log("stopid ",stopid);
			console.log("tripsids ",tripsids);
			console.log("num ",num);
			staticFeedAPI.getXStopTimesForStop(stopid,tripsids,num)
			.then(results => {
				this.setState( {stoptimes: results.stoptimes})
			}) 
		} else {
			console.log("else")
			console.log("this.state.stop_name ",this.state.stop_name);
			console.log("this.state.direction ",this.state.direction);
			staticFeedAPI.getStopByNameAndDirection(encodeURIComponent(this.state.stop_name), this.state.direction)
			.then( stop => {
				console.log("stop ",stop);
				this.setState( {stop: stop.stop_id}, () => {
					stopid = this.state.stop;
					staticFeedAPI.getXStopTimesForStop(stopid,tripsids,num)
					.then(results => {
						this.setState( {stoptimes: results.stoptimes})
					}) 
				});
			})
		}
	}


	render() {
		let routesLoaded = this.state.routes.length;
		let routeChosen = this.state.route;
		let directionChosen = this.state.direction;
		let stopChosen = this.state.stop;
		let canSearch = this.state.canSearch;

		return (
			<div>
				<h2>Next Train!</h2>
				<form id="next-train-form" name="next-train-form" onSubmit={this.handleSubmit}> 
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
								name="route-select" 
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
							title="Select your stop" 
							value={this.state.stop_name || ""}
							onChange={this.handleStopSelect} >
							{	this.state[`stops_dir${this.state.direction}`].map((item,index) => 
								<option key={index} value={item}>{item}</option>
							)}
						</select>
					</div>
					)	
				}
				{
					(
					<div>
						<label htmlFor="num-results-input">Number of results (1-6): </label>
						<input 
							id="num-results-input" 
							type="number" 
							min="1" 
							max="6" 
							title="input number of results to show" 
							value={this.state.numResults || ""}
							onChange={this.handleNumResultsInput} >
						</input>
					</div>
					)	
				}
				{
					canSearch && (
					<div>
						<button type="submit">Next Train</button>
					</div>
					)	
				}
				</form>
				<div id="results">
					{
						this.state.stoptimes.length > 0 && (
							<ul id="results-list">
								{this.state.stoptimes.map((item,index) => 
									<li className="results-item" key={index} >{item}</li>
								)}
							</ul>
						)
					}
				</div>
			</div>

		);
	}

}

export default NextSearchForm;