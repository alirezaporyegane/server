const express = require('express'),
router = express.Router();

const Restaurant = require('./Restaurant');
const Shared = require('./Shared');

router.use('/restaurant', Restaurant);
router.use('/shared', Shared);

module.exports = router;