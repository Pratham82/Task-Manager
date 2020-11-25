const express = require('express')
require('./db/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// Parsing the JSON using express
app.use(express.json())

// Register a new middleware function
// Middleware methods will be run before it goes to the route handlers

/*app.use((req, res, next) => {
  // We can filter the routes which users can acccess
  if (req.method === 'GET') {
    //GET requests should be private
    res.send({ message: 'GET Requests are disabled' })
  } else {
    next()
  }
})*/

/*
// Creating a middleware for maintenance mode
app.use((req, res, next) => {
  // Dont allow any requests in the maintenance
  res.status(503).send('Site is under maintenance mode')
})
*/

// Redirecting the requests to the specific routers
app.use('/users', require('./routers/user'))
app.use('/tasks', require('./routers/task'))

// Starting up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
  // Find user by the task
  //const task = await Task.findById('5fbe2ece3ff5b93f5e7c6d85')
  // Populat will take the ID of the owner to being the entire profile of that owner
  //await task.populate('owner').execPopulate()
  //console.log(task.owner)

  //Find User by their ID
  //
  const user = await User.findById('5fbe2c474e90e03b2b3ebc7a')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

main()
