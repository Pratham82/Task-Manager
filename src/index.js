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
