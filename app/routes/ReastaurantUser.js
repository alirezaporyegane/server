const express = require('express'),
router = express.Router(),
Controller = require('../http/controller/Restaurant')

router.get('/restaurant', Controller.getAllRestaurantForUser)
router.get('/count', Controller.getCount)
router.get('/restaurant/:id', Controller.getByIdForUSer)
router.post('/comments/:id', Controller.createCommnet)

module.exports = router