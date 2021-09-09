const Restaurant = require('../../model/Restaurant')
const mongoose = require('mongoose')
const _ = require('lodash');
const bcript = require('bcrypt')
const { RestaurantValidatorUpdate, RestaurantValidatorCreate, loginValidator } = require('../validator/Restaurant')

class RestaurantsControllers {
  async getAll (req, res) {
    const limit = req.params.limit ? parseInt(req.parems.limit) : '';
    const skip = req.params.skip ? paresInt(req.params.spip) : '';

    Restaurant.find().select('title description score adminUserName image address').limit(limit).skip(skip)
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

  async create (req, res) {
    const error = RestaurantValidatorCreate(req.body);
    if (error) return res.status(400).json(error.message);

    bcript.hash(req.body.adminPassword, 12, (err, hash) => {
      if (err) return res.status(500).json({
        error: err
      })

      const restaurant = new Restaurant({..._.pick(req.body, ['title', 'description', 'address', 'adminUserName']), adminPassword: hash})
  
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
      $set: {..._.pick(req.body, ['title', 'description', 'address', 'adminUserName'])}
    }, { new: true })
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

  async addFood (req, res) {
    res.status(200).json({
      msg: 'how Are you'
    })
  }

  async getFood (req, res) {
    res.status(200).json({
      msg: 'how Are you'
    })
  }
};

module.exports = new RestaurantsControllers();