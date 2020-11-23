const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

// Creating a seperate schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

// Setting up a middleware with userSchema

// Creating our own method for login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  // Check if the user with that email exists or not
  if (!user) {
    throw new Error('Unable to login')
  }

  // Compare passwords
  const validatePassword = await bcrypt.compare(password, user.password)
  if (!validatePassword) {
    throw new Error('Unable to login')
  }

  return user
}

// Hashing the plain text password before saving
userSchema.pre('save', async function (next) {
  // Instead of using "this" everywhere we will declare it once
  const user = this

  // Hashing the password only if the passowrd is modified,  then save it to the DB
  // isModified will be true when the use is first created and also when the user is being updated    and password was one of the updates
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  console.log('Just before saving')
  // "next" will run some code before the user is saved
  next()
})

// Creating User model with validations
const User = mongoose.model('User', userSchema)
module.exports = User
