const express = require('express'),
router = express.Router(),
Controller = require('../http/controller/Restaurant')

const { authUser, authRestaurant } = require('../http/middleware/Auth')

router.get('/', Controller.getAll)
router.get('/:id', Controller.getById)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)
router.post('/login', Controller.login)
router.post('/food/add-food', [authUser, authRestaurant], Controller.addFood)
router.get('/food/getFood', [authUser, authRestaurant], Controller.getFood)

module.exports = router