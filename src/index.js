const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const PORT = process.env.PORT || 3000

// Parsing the JSON using express
app.use(express.json())

// Requests

// @POST Request -  Creating users
app.post('/users', (req, res) => {
  // Creating user from the requested json object
  const user = new User(req.body)

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch(err => res.status(400).send(err))
})

// @POST Request - Creating Tasks
app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(400).send(err.message))
})

// Starting up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
