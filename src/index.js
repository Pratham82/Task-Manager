const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const PORT = process.env.PORT || 3000

// Parsing the JSON using express
app.use(express.json())

// Requests

// @POST Request
app.post('/users', (req, res) => {
  const data = req.body
  const { name, email, password, age } = data

  // Creating user from the requested json object
  const user = new User(data)

  user
    .save()
    .then(() => {
      res.send(user)
    })
    .catch(err => res.send(err.message))
})

// Starting up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
