const { Router } = require ('express');
const StaticFeedTripsController = require('../controllers/static-feed/trips_controller');

const router = new Router();

router.route('/tripids_by_serviceids').post(StaticFeedTripsController.tripIdsByServiceIds);
router.route('/trips_by_date_route/:date/:route').get(StaticFeedTripsController.tripsByDateAndRoute);
router.route('/trips_by_date_route_direction').post(StaticFeedTripsController.tripsByDateAndRouteAndDirection);
router.route('/tripsidslist_by_date_route_direction').post(StaticFeedTripsController.tripsIdsListByDateAndRouteAndDirection);

module.exports = router;
