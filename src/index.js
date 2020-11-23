const express = require('express')
require('./db/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// Parsing the JSON using express
app.use(express.json())

// Redirecting the requests to the specific routers
app.use('/users', require('./routers/user'))
app.use('/tasks', require('./routers/task'))

// Starting up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const myFunc = async () => {
  // Creating a token
  const token = jwt.sign({ _id: 'sdsd866' }, 'secretkey', {
    expiresIn: '7 days',
  })

  // Verify the token
  const data = jwt.verify(token, 'secretkey')

  console.log(token)
  console.log(data._id === 'sdsd866')
}

myFunc('Red1234545')
