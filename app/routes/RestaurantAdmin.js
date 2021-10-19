const express = require('express'),
router = express.Router(),
Controller = require('../http/controller/Restaurant')
const authRestaurant = require('../http/middleware/Auth')

router.post('/login', Controller.login)

router.post('/food/add-food', Controller.createFood)
router.get('/food/get-food', Controller.getFood)
router.get('/food/get-food-count', Controller.getFoodCount)
router.delete('/food/delete-food/:id', Controller.deleteFood)
router.get('/food/get-food-id/:id', Controller.getFoodbyId)
router.put('/food/get-food-update/:id', Controller.updateFood)

module.exports = router