import React from "react";

const StopSelect = props => {
	return (
		<div className='form-group'>
			<label className='form-label' htmlFor="stop-select">Choose a Stop: </label>
			<select 
				id="stop-select" 
				className='form-select' 
				title="Select your stop" 
				value={props.stop_name}
				onChange={props.handleStopSelect} >
				{	props.stops.map((item,index) => 
					<option key={index} value={item}>{item}</option>
				)}
			</select>
		</div>
	)
}

export default StopSelect;