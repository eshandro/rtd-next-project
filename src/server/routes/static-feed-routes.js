const { Router } = require ('express');

const StaticFeedController = require('../controllers/static-feed/routes_controller');

const router = new Router();

router.route('/getRoutesList').get(StaticFeedController.getRoutesList);

module.exports = router;