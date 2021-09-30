const express = require('express'),
router = express.Router(),
Controller = require('../http/controller/Restaurant')
const authUser = require('../http/middleware/Auth')
const authRestaurant = require('../http/middleware/Auth')

router.post('/login', Controller.login)

router.post('/food/add-food', [authUser, authRestaurant], Controller.createFood)
router.get('/food/get-food',[authUser, authRestaurant], Controller.getFood)
router.get('/food/get-food-count',[authUser, authRestaurant], Controller.getFoodCount)
router.delete('/food/delete-food/:id',[authUser, authRestaurant], Controller.deleteFood)
router.get('/food/get-food-id/:id',[authUser, authRestaurant], Controller.getFoodbyId)
router.put('/food/get-food-update/:id',[authUser, authRestaurant], Controller.updateFood)

module.exports = router