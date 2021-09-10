const mongoose = require('mongoose'),
Schema = mongoose.Schema,
jwt = require('jsonwebtoken'),
config = require('config')

const CommentsSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  score: Number
})

const menuSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  commnets: [CommentsSchema],
  score: {
    type: Number,
    required: true,
    default: 0
  }
})


const RestaurantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  address: String,
  image: String,
  comments: [CommentsSchema],
  menu: [menuSchema],
  adminUserName: {
    type: String,
    required: true
  },
  adminPassword: {
    type: String,
    required: true
  }
})

RestaurantSchema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    username: this.adminUserName,
    role: 'restaurant'
  }

  return jwt.sign(data, config.get('jwtPrivetKey'))
}


module.exports = mongoose.model('resturant', RestaurantSchema)