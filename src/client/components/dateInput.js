import React from "react";
import DatePicker from 'react-date-picker';

const DateInput = props => {
	return (
		<div className='form-group'>
			<label className='form-label' htmlFor="date-picker">Date: </label>
			<DatePicker 
				id="date-picker" 
				type="text" 
				value={props.date} 
				onChange={props.handleDatePicker} >
			</DatePicker>
		</div>
	);
};

export default DateInput;