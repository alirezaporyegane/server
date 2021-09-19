const mongoose = require('mongoose'),
Schema = mongoose.Schema

const shareSchema = new Schema({
  file: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Share', shareSchema)