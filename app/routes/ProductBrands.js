const express = require('express'),
router = express.Router(),
[ auth, authAdmin ] = require('../http/middleware/Auth'),
productsBrandsController = require('../http/controller/ProductBrands');

router.get('/', [auth, authAdmin], productsBrandsController.getAll);
router.get('/count', [auth, authAdmin], productsBrandsController.getCount);
router.get('/:id', [auth, authAdmin], productsBrandsController.getById);
router.post('/', [auth, authAdmin], productsBrandsController.create);
router.put('/:id', [auth, authAdmin], productsBrandsController.update);
router.delete('/:id', [auth, authAdmin], productsBrandsController.remove);