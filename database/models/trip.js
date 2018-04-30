const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CalendarSchema = require('./calendar');
const CalendarDatesSchema = require('.calendar_dates');

/*
	trip_id = unique id
	day = service_id in calendar collection ()
	route_id = unique identifier referenced in routes collection
	direction_id = contains a binary value that indicates the direction of travel for a trip. 
					Use this field to distinguish between bi-directional trips with the same route_id. 
					This field is not used in routing; it provides a way to separate trips by direction when 
					publishing time tables. You can specify names for each direction with the trip_headsign field.
					0-outbound travel, 1-inbound travel
					For example, you could use the trip_headsign and direction_id fields together to assign a name to 
					travel in each direction for a set of trips. A trips.txt file could contain these rows for use in time tables:
					* trip_id,...,trip_headsign,direction_id
					* 1234,...,Airport,0
					* 1505,...,Downtown,1
	headsign = contains the text that appears on a sign that identifies the trip's destination to passengers.
					Use this field to distinguish between different patterns of service in the same route. If 
					the headsign changes during a trip, you can override the trip_headsign by specifying values for 
					the stop_headsign field in stoptimes collection
	block_id = The block_id field identifies the block to which the trip belongs. A block consists of a single trip 
					or many sequential trips made using the same vehicle, defined by shared service day and block_id. A 
					block_id can have trips with different service days, making distinct blocks
	calendar = indicates service availability by date, referenced by service_id
	calendar_dates = indicates service availabilty exceptions for a specific date, referenced by service_id
	stop_times = list of stoptimes associated with this trip

*/

const TripSchema = new Schema ({
	trip_id: String,
	service_id: String,
	route_id: String,
	direction_id: Number,
	headsign: String,
	block_id: String,
	calendar: [CalendarSchema],
	calendar_dates: [CalendarDatesSchema],
	stop_times: [{
		type: Schema.Types.ObjectId,
		ref: 'stoptime'
	}]

});

const Trip = mongoose.model('trip', TripSchema)

// module.exports = TripSchema;
module.exports = Trip;