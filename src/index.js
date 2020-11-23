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
const myFunc = async password => {
  // Hashing password
  const hashedPass = await bcrypt.hash(password, 8)
  console.log(password)
  console.log(hashedPass)

  // Comparing hashes
  const matchedVal = await bcrypt.compare('Red12345', hashedPass)
  console.log(matchedVal ? 'Passowrd Matched' : 'Passwords do not match')
}

myFunc('Red1234545')
