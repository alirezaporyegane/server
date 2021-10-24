const express = require('express'),
router = express.Router(),
{ auth, authAdmin } = require('../http/middleware/Auth'),
productsBrandsController = require('../http/controller/ProductBrands');

router.get('/', productsBrandsController.getAll);
router.get('/count', productsBrandsController.getCount);
router.get('/:id', productsBrandsController.getById);
router.post('/', productsBrandsController.create);
router.put('/:id', productsBrandsController.update);
router.delete('/:id', productsBrandsController.remove);


module.exports = router