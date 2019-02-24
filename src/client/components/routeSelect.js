import React from "react";

const RouteSelect = (props) => {
	return (
		<div className='form-group'>
			<label className='form-label' htmlFor="route-select">Choose Route: </label>
			<select 
				id="route-select" 
				className='form-select' 
				name="route-select" 
				title="Select your route" 
				value={props.route} 
				onChange = {props.handleRouteSelect} >
				{props.routes.map(item => 
					<option key={item._id} value={item.route_id}>{item.shortName} ({item.name})</option>
				)}
			</select>
		</div>
	)

};

export default RouteSelect;