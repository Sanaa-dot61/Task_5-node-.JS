const mongoose = require("mongoose")

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = User