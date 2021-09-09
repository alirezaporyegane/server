const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const app = express();


class Application {
  constructor () {
    this.setupExpressServer()
    this.setupMiddleware()
    this.setupMongoose()
    this.setupConfigs()
    this.setupRoutes()
  }

  setupRoutes () {
    const Api = require('./routes/Api');

    app.use('/api', Api)
  }

  setupMiddleware () {
    const ErrorMiddleware = require('./http/middleware/Error')
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static("public"));
    app.use(cors());
    if(app.get("env") === "development")
    app.use(morgan('tiny'))
    app.use(ErrorMiddleware)
  }

  setupConfigs () {
    process.on("uncaughtException", (err) => {
      console.log(err)
      winston.error(err.message)
    })
    
    process.on("unhandledRejection", (err) => {
      console.log(err)
      winston.error(err.message)
    })
    
    // winston
    winston.add(new winston.transports.File({filename: 'error_log.log'}))
    winston.add(new winston.transports.MongoDB({
      db: 'mongodb://127.0.0.1:27017/error-api-base',
      level: "error"
    }))
  }

  setupMongoose () {
    mongoose.connect("mongodb://127.0.0.1:27017/node-Food",{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log("mongodb Is Connected");
      })
      .catch(err => {
        console.log("db not connected", err);
      })
  }

  setupExpressServer () {
    const port = process.env.port || 5000;
    app.listen(port, (err) => {
      if (err) console.log(err)
      else console.log(`app listen to port ${port}`)
    });
  }
}

module.exports = Application