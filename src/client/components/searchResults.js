import React from "react";
import dateHelpers from '../../server/utils/dateHelpers';

const SearchResults = props => {
	return (
		<ul id="results-list">
			{props.stoptimes.map((item,index) => 
				<li className="results-item" key={index} >{dateHelpers.convertDBTimeTo12(item)}</li>
			)}
		</ul>
	);
};

export default SearchResults;