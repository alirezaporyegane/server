const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const RestaurantValidatorCreate = (data) => {
  const Schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string(),
    adminUserName : Joi.string().required(),
    adminPassword : Joi.string().required()
  })
  Schema.validate(data)
}

const RestaurantValidatorUpdate = (data) => {
  const Schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    address: Joi.string(),
    adminUserName : Joi.string(),
    adminPassword : Joi.string()
  })
  Schema.validate(data)
}

const loginValidator = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(data);
};

module.exports = {
  RestaurantValidatorCreate,
  RestaurantValidatorUpdate,
  loginValidator
}