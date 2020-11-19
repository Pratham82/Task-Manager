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

// @GET Request - Fetching Users
app.get('/users', (req, res) => {
  User.find({})
    .then(users => res.status(302).json(users))
    .catch(err => res.status(500).send(err.message))
})

// @GET Request - Fetching users by ID
app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  User.findById(_id)
    .then(user => (!user ? res.status(404).send() : res.status(302).json(user)))
    .catch(err => res.status(400).send(err.message))
})

// @GET Request - Fetching Users
app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => res.status(302).send(tasks))
    .catch(err => res.status(500).send(err.message))
})

// @GET Request /tasks/:idu , (req,ress )ers by ID
app.get('/tasks/:id', (req, res) => {
  _id = req.params.id
  Task.findById(_id)
    .then(task => (!task ? res.status(404).send() : res.status(302).send(task)))
    .then(err => res.status(500).send(err))
})

// Starting up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
