const { Router } = require ('express');
const StaticFeedTripsController = require('../controllers/static-feed/trips_controller');

const router = new Router();

router.route('/tripids_by_serviceids/:serviceids').get(StaticFeedTripsController.getTripIdsByServiceIds);

module.exports = router;
