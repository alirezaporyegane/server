const express = require('express'),
router = express.Router(),
SharedController = require('../http/controller/Shared'),
upload = require('../http/middleware/upload')

router.post('/file', upload.single('file'), SharedController.createImage)

module.exports = router
