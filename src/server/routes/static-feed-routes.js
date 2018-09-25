const { Router } = require ('express');
const StaticFeedRoutesController = require('../controllers/static-feed/routes_controller');

const router = new Router();

router.route('/routes_list').get(StaticFeedRoutesController.getRoutesList);

router.route('/routes_by_tripids/:tripids').get(StaticFeedRoutesController.getRoutesInfoByTripIds);


module.exports = router;