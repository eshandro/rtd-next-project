const { Router } = require ('express');
const StaticFeedStopTimesController = require('../controllers/static-feed/stoptimes_controller');

const router = new Router();

router.route('/next_x_stoptimes_for_stop').post(StaticFeedStopTimesController.nextXStopTimesForStop);

module.exports = router;
