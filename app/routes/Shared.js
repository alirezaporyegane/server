const express = require('express'),
router = express.Router(),
SharedController = require('../http/controller/Restaurant')
const upload = require('../http/middleware/upload')

router.post('/file', upload.single('image'), SharedController.createImage)

module.exports = router
