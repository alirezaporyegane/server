const Restaurant = require('../../model/Restaurant')
const mongoose = require('mongoose')
const _ = require('lodash');
const bcript = require('bcrypt')
const { RestaurantValidatorUpdate, RestaurantValidatorCreate, loginValidator, FoodValidator } = require('../validator/Restaurant')

class RestaurantsControllers {
  async getAll (req, res) {
    const limit = req.query.limit ? Number(req.query.limit) : '';
    const skip = req.query.skip ? Number(req.query.skip) : '';
    Restaurant.find().skip(skip).limit(limit)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async getAllRestaurantForUser (req, res) {
    const limit = req.query.limit ? Number(req.query.limit) : '';
    const skip = req.query.skip ? Number(req.query.skip) : '';
    Restaurant.find().select('title description address image score comments logo').skip(skip).limit(limit)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        msg: 'Id is not valid',
        success: false
      })
    }

    Restaurant.findById(id).select('-adminPassword')
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(404).json({
          msg: 'Restaurant Not Found',
          success: false
        })
      })
  }

  async getByIdForUSer (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        msg: 'Id is not valid',
        success: false
      })
    }

    Restaurant.findById(id).select('-adminPassword -adminUserName')
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(404).json({
          msg: 'Restaurant Not Found',
          success: false
        })
      })
  }
  
  async getCount (req, res) {
    Restaurant.find().countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async create (req, res) {
    const error = RestaurantValidatorCreate(req.body);
    if (error) return res.status(400).json(error.message);

    bcript.hash(req.body.adminPassword, 12, (err, hash) => {
      if (err) return res.status(500).json({
        error: err
      })

      const restaurant = new Restaurant({..._.pick(req.body, ['title', 'altTitle', 'description', 'score', 'address', 'image', 'header', 
        'comments', 'menu', 'adminUserName', 'adminPassword', 'adminEmail', 'name', 'familyName', 'phoneNumber', 'telegramField'
        , 'instagramField', 'whatsappField', 'logo', 'slug', 'metaTitle', 'metaDescription']),
        adminPassword: hash,
      })
  
        restaurant.save()
          .then(result => {
            res.status(200).json(_.pick(result, 
              ['title', 'description', 'address', 'adminUserName']))
          })
          .catch(err => {
            res.status(500).json({
              error: err,
              success: false
            })
          })
    })
  }

  async update (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
        msg: 'Id is not Valid',
        success: false
      })

    const error = RestaurantValidatorUpdate(req.body);
    if (error) return res.status(400).json(error.message);

     Restaurant.findByIdAndUpdate(id, {
      $set: {..._.pick(req.body, ['title', 'altTitle', 'description', 'score', 'address', 'image', 'header', 
      'comments', 'menu', 'adminUserName', 'adminEmail', 'name', 'familyName', 'phoneNumber', 'telegramField'
      , 'instagramField', 'whatsappField', 'logo', 'slug', 'metaTitle', 'metaDescription']
     )}}, { new: true })
      .then(result => {
        res.status(200).json(_.pick(result, ['title', 'description', 'address', 'adminUserName']))
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async delete (req, res) {
    const id = req.params.id;

    Restaurant.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          success: true
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            success: false
          })
        })
      })
  }

  async login (req, res) {
    const {error} = loginValidator(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      message: error
    })

    
    Restaurant.find({ adminUserName: req.body.userName })
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            msg: 'this user is not registre'
          })
        }

        const token = user[0].generateAuthToken()

        bcript.compare(req.body.password, user[0].adminPassword, (err, result) => {
          if (err) {
            return res.status(401).json({
              msg: 'auth failed'
            })
          } else if (result) {
            return res.header('Access-Control-Expose-headers', 'x-auth-token').header('x-auth-token', token).status(200).json({
              msg: 'login sucess',
              token: token
            })
          } else {
            return res.status(401).json({
              msg: 'login is failed'
            })
          }
        })
      })
  }

  async createFood (req, res) {
    console.log(req.user);
    const restaurant = await Restaurant.findOne({adminUserName: req.user.username})

    if (!restaurant) return res.status(404).json({
      msg: 'this restaurant not Found'
    })

    const { error } = FoodValidator(req.body)
    if (error) return res.status(400).json(error.messaage)

    restaurant.menu.push(_.pick(req.body, ['title', 'description', 'pricebeforeDiscount', 'image', 'discount']))

    restaurant.save()
      .then(() => {
        res.status(200).json({
          success: true
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async getFood (req, res) {
    Restaurant.findOne({adminUserName: req.user.username})
      .then(restaurant => {
        res.status(200).json(restaurant.menu)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async getFoodCount (req, res) {
    const restaurant = await Restaurant.findOne({adminUserName: req.user.username})

      if (!restaurant) return res.status(404).json({
        mag: 'this resturant not Found'
      })

      res.status(200).json(restaurant.menu.length)
  }

  async getFoodbyId (req, res) {
    const restaurant = await Restaurant.findOne({adminUserName: req.user.username})
    const id = req.params.id

    if (!restaurant) return res.status(404).json({
      mag: 'this resturant not Found'
    })

    res.status(200).json(restaurant.menu.id(id))
  }


  async updateFood (req, res) {
    const restaurant = await Restaurant.findOne({adminUserName: req.user.username})

      if (!restaurant) return res.status(404).json({
        mag: 'this resturant not Found'
      })

      const id = req.params.id
      const foundFood = restaurant.menu.id(id)

      if (!foundFood) return res.status(404).json({
        msg: 'this restaurant not found'
      })

      foundFood.title = req.body.title ? req.body.title : null
      foundFood.description = req.body.description ? req.body.description : null
      foundFood.price = req.body.price ? req.body.price : null
      foundFood.image = req.body.image ? req.body.image : null
      foundFood.pricebeforeDiscount = req.body.pricebeforeDiscount ? req.body.pricebeforeDiscount : null
      foundFood.discount = req.body.discount ? req.body.discount : null

      restaurant.save()
        .then(() => {
          res.status(200).json(true)
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
  }

  async deleteFood (req, res) {
    const restaurant = await Restaurant.findOne({adminUserName: req.user.username})

      if (!restaurant) return res.status(404).json({
        mag: 'this resturant not Found'
      })

      const id = req.params.id
      if (!restaurant.menu.id(id)) return res.status(404).json({
        msg: 'this restaurant not found'
      })

      restaurant.menu.id(id).remove()
      await restaurant.save()
      res.status(200).json({
        success: true
      })
  }

  async createCommnet (req, res) {
    const id = req.params.id
    Restaurant.findById(id)
      .then(data => {
        if (data) return res.status(400).json({
          code: 400,
          msg: 'data not found'
        })

        restaurant.comments.push(_.pick(req.body, ['user', 'text','score']))
        restaurant.save()
          .then(() => {
            res.status(200).json({
              success: true
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              error: err
            })
          })
      })
  }
};

module.exports = new RestaurantsControllers();