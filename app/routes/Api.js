const express = require('express'),
router = express.Router();

const Restaurant = require('./Restaurant');

router.use('/restaurant', Restaurant)

module.exports = router;