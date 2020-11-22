const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { findOneAndUpdate, findByIdAndUpdate } = require('./models/user')

const app = express()
const PORT = process.env.PORT || 3000

// Parsing the JSON using express
app.use(express.json())

//******* User endpoints ********
// @POST Request -  Creating users
app.post('/users', async (req, res) => {
  // Creating user from the requested json object
  const user = new User(req.body)

  // Using async await
  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// @GET Request - Fetching Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// @GET Request - Fetching users by ID
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    return !user ? res.status(404).send() : res.status(302).send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// @PATCH Request - Update the user
app.patch('/users/:id', async (req, res) => {
  const allowedUpdates = ['age', 'name', 'email', 'password']
  const updates = Object.keys(req.body)
  const isValidOperations = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperations) {
    return res.status(400).send({ error: 'Invalid Update not allowed' })
  }

  try {
    // Here the first parameter is the ID to find, 2nd is the new data that we want to update and third are the options.
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    return !user ? res.status(404).send() : res.status(200).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

//****** Task Endpoints ********
// @POST Request - Creating Tasks
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// @GET Request - Fetching Tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// @GET Request task by ID
app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
    return !task ? res.status(404).send() : res.status(201).send(task)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// @PATCH Request - Updating the Tasks
app.patch('/tasks/:id', async (req, res) => {
  const allowedTasks = ['description', 'status']
  const taskUpdates = Object.keys(req.body)
  const validateTasks = taskUpdates.every(task => allowedTasks.includes(task))
  if (!validateTasks) {
    return res.status(400).send({ error: 'Invalid update not allowed' })
  }
  try {
    const newTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    return !newTask ? res.status(404).send() : res.status(200).send(newTask)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Starting up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
