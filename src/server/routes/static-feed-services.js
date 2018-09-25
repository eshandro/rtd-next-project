const { Router } = require ('express');
const StaticFeedServicesController = require('../controllers/static-feed/services_controller');

const router = new Router();

router.route('/service_ids_by_date/:date').get(StaticFeedServicesController.getServiceIdsForDate);


module.exports = router;