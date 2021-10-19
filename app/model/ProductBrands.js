const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  altName: {
    type: String
  },
  slug: {
    type: String
  },
  image: {
    type: String
  },
  body: {
    type: String
  },
  tags: [String],
  otherNAme: [String],
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  sortOrder: {
    type: String
  },
  productTypeIds: [Number],
  featured: {
    type: Boolean
  }
})

module.exports = mongoose.model('Brand', brandSchema);