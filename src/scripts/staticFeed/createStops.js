const Stop = require('../../../database/models/stop');

// Stop Schema:
// id: Number,
// name: String,
// desc: String,
// direction: String,
// lat: Number,
// long: Number,
// // stop_times: [{
// // 	type: Schema.Types.ObjectId,
// // 	ref: 'stop_time'
// // }]
// stop_times: [StopTimeSchema],
// // trips: [TripSchema]
// trips: [{
// 	type: Schema.Types.ObjectId,
// 	ref: 'trip'
// }]
