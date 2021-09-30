const express = require('express'),
router = express.Router(),
Controller = require('../http/controller/Restaurant')

router.get('/', Controller.getAll)
router.get('/count', Controller.getCount)
router.get('/:id', Controller.getById)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)


module.exports = router