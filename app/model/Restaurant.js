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
}, { timestamps: true })

const menuSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pricebeforeDiscount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number
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
}, { timestamps: true })


const RestaurantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  alttitle: {
    type: String
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
  header: String,
  comments: [CommentsSchema],
  menu: [menuSchema],
  adminUserName: {
    type: String,
    required: true
  },
  adminPassword: {
    type: String,
    required: true
  },
  adminEmail: {
    type: String,
  },
  name: {
    type: String
  },
  familyName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  telegramField : {
    type: String
  },
  instagramField: {
    type: String
  },
  whatsappField: {
    type: String
  },
  logo: {
    type: String
  },
  slug: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String
  }
},{ timestamps: true })

RestaurantSchema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    username: this.adminUserName,
    role: 'restaurant'
  }

  return jwt.sign(data, config.get('jwtPrivetKey'))
}


module.exports = mongoose.model('resturant', RestaurantSchema)