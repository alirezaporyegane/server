const BrandsModel = require('../../model/ProductBrands'),
mongoose = require('mongoose'),
_ = require('lodash');

class ProductBrand {
  getAll (req, res) {
    const limit = req.query.limit ? Number(req.query.limit) : '';
    const skip = req.query.skip ? Number(req.query.skip) : '';
    const include = req.query.include ? req.query.include : '';

    BrandsModel
      .find()
      .skip(skip)
      .limit(limit)
      .select(include)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  getCount (req, res) {

  }

  getById (req, res) {

  }

  create (req, res) {

  }

  update (req, res) {

  }

  remove (req, res) {

  }
}

module.exports = new ProductBrand()