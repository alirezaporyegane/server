const express = require('express'),
router = express.Router();

const RestaurantAdmin = require('./RestaurantAdmin');
const RestaurantSuperAdmin = require('./RestaurantSuperAdmin');
const RestaurantUser = require('./ReastaurantUser');
const Shared = require('./Shared');

router.use('/restaurant', RestaurantSuperAdmin)
router.use('/restaurant', RestaurantAdmin);
router.use('/user', RestaurantUser);
router.use('/shared', Shared);

module.exports = router;