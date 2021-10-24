const BrandsModel = require('../../model/ProductBrands'),
mongoose = require('mongoose'),
{ BrandValidator } = require('../validator/ProductBrands'),
_ = require('lodash');

class ProductBrand {
  getAll (req, res) {
    const limit = req.query.limit ? Number(req.query.limit) : '';
    const skip = req.query.skip ? Number(req.query.skip) : '';
    const include = req.query.include ? req.query.include : '';
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    BrandsModel
      .find({ slug: { $regex: slug }, title: { $regex: name } })
      .skip(skip)
      .limit(limit)
      .select(['_id', 'name', 'altName', 'slug', 'image', 'body', 'tags', 'otherNames', 'sortOrder'])
      .select(include)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal Server',
          code: 500
        })
      })
  }

  getCount (req, res) {
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    BrandsModel.countDocuments({ slug: { $regex: slug }, title: { $regex: name } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal Server',
          code: 500
        })
      })
  }

  getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
    }

    BrandsModel.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'altName', 'slug', 'image', 'body', 'tags', 'otherNames', 'metaTitle', 'metaDescription', 'sortOrder','productTypeIds','featured']))
      })
      .catch(() => {
        res.status(500).json({
          message: 'Internal Server',
          code: 500
        })
      })
  }

  create (req, res) {
    const { error } = BrandValidator(req.body);
    if (error) return res.status(400).json({
      message: error.message,
      code: 400
    })


    const brandModel = new BrandsModel(_.pick(req.body, ['name', 'altName', 'slug', 'image', 'body', 'tags', 'otherNames', 'metaTitle', 'metaDescription', 'sortOrder','productTypeIds','featured']))

    brandModel.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id', 'name', 'altName', 'slug', 'image', 'body', 'tags', 'otherNames', 'metaTitle', 'metaDescription', 'sortOrder','productTypeIds','featured']))
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal Server',
          code: 500
        })
      })
  }

  update (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const error = BrandValidator(req.body);
    if (error) return res.status(400).json({
      message: error.message,
      code: 400
    });

    BrandsModel.findByIdAndUpdate(id, {
      $set: {..._.pick(req.body, ['name', 'altName', 'slug', 'image', 'body', 'tags', 'otherNames', 'metaTitle', 'metaDescription', 'sortOrder','productTypeIds','featured']
    )}}, { new: true })
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'altName', 'slug', 'image', 'body', 'tags', 'otherNames', 'metaTitle', 'metaDescription', 'sortOrder','productTypeIds','featured']))
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal Server',
          code: 500
        })
      })
  }

  remove (req, res) {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    BrandsModel.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          success: true
        })
        .catch(err => {
          res.status(500).json({
            message: 'Internal Server',
            code: 500
          })
        })
      })
  }
}

module.exports = new ProductBrand()
