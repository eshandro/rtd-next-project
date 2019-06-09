import React from "react";

const NumStopsInput = props => {
	return (
		<div className='form-group'>
			<label className='form-label' htmlFor="num-results-input">Number of results (1-6): </label>
			<input 
				id="num-results-input" 
				className='form-input' 
				type="number" 
				min="1" 
				max="6" 
				title="input number of results to show" 
				value={props.numResults}
				onChange={props.handleNumResultsInput} >
			</input>
		</div>
	);
};

export default NumStopsInput;