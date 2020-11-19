const mongoose = require('mongoose')
const validator = require('validator')

// Creating User model with validations
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: [7, 'Password should be more than 6 characters'],
    validate(val) {
      if (val.toLowerCase().includes('password')) {
        throw new Error('Password should not be same as password')
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(val) {
      if (val < 0) {
        throw new Error('Age must be a positive value')
      }
    },
  },
})
module.exports = User
