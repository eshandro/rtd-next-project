import React from "react";

const DirectionSelect = props => {
	return (
		<div className='form-group'>
			<label className='form-label' htmlFor="direction-select">Choose Direction: </label>
			<select 
				id="direction-select" 
				className='form-select' 
				title="Select your direction" 
				value={props.direction}
				onChange={props.handleDirectionSelect} >
				{props.directions.map((item,index) => 
					<option key={item} value={index}>{item}</option>
				)}
			</select>
		</div>
	)
}

export default DirectionSelect;