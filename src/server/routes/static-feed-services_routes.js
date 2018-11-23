const { Router } = require ('express');
const StaticFeedServicesController = require('../controllers/static-feed/services_controller');

const router = new Router();
// :date must be in format 2019-09-27
router.route('/serviceids_by_date/:date').get(StaticFeedServicesController.serviceIdsForDate);


module.exports = router;