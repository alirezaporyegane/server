const express = require('express'),
router = express.Router(),
SharedController = require('../http/controller/Shared')

router.post('/file', SharedController.createImage)

module.exports = router
