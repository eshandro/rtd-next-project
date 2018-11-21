const { Router } = require ('express');
const StaticFeedStopsController = require('../controllers/static-feed/stops_controller');

const router = new Router();

router.route('/next_x_stoptimes_for_stop').post(StaticFeedStopsController.nextXStopTimesForStop);
router.route('/stops_by_stopids').post(StaticFeedStopsController.stopsByIds);
router.route('/stops_by_direction/:dir').get(StaticFeedStopsController.stopsByDirection);
router.route('/stop_by_name_direction/:name/:dir').get(StaticFeedStopsController.getStopByNameAndDirection);

module.exports = router;
