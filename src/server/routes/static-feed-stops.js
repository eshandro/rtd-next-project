const { Router } = require ('express');
const StaticFeedStopsController = require('../controllers/static-feed/stops_controller');

const router = new Router();

router.route('/next_x_stoptimes_for_stop').post(StaticFeedStopsController.nextXStopTimesForStop);
router.route('/stops_by_stopids').post(StaticFeedStopsController.getStopsList);

module.exports = router;
