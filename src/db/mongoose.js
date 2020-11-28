const mongoose = require('mongoose')
require('dotenv').config()

// Connecting to the DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
