const { Router } = require ('express');
const StaticFeedRoutesController = require('../controllers/static-feed/routes_controller');

const router = new Router();

router.route('/routes_list').get(StaticFeedRoutesController.routesList);

router.route('/routes_by_tripids').post(StaticFeedRoutesController.routesInfoByTripIds);


module.exports = router;