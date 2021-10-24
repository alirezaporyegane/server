const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const BrandValidator = (data) => {
  const Schema = joi.object({
    name: joi.string().required().max(150),
    altName: joi.string().allow(null).max(150),
    slug: joi.string().allow(null),
    image: joi.string().allow(null),
    body: joi.string().allow(null),
    tags: joi.array(joi.string().allow(null)),
    otherNames: joi.array(joi.string().allow(null)),
    metaTitle: joi.string().allow(null),
    metaDescription: joi.string().allow(null),
    sortOrder:  joi.number().integer(),
    productTypeIds: joi.objectId().allow(null),
    featured: joi.boolean()
  })
  return Schema.validate(data)
}

module.exports = {
  BrandValidator
}