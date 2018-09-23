// const Route = require('../../database/models/route');
const getRoutesList = require('../../database/queries/getRoutesList');

module.exports = {

	getRoutesList (req, res, next) {
		return getRoutesList();
	},

};
