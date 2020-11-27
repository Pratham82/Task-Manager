// with toJSON we can manipulate the data, which is returned by JSON.stringify()
const pet = {
  user: 'Joey',
}

pet.toJSON = function () {
  return {}
}

console.log(JSON.stringify(pet))
console.log(JSON.stringify(pet))

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

const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
  // Find user by the task
  //const task = await Task.findById('5fbe2ece3ff5b93f5e7c6d85')
  // Populat will take the ID of the owner to being the entire profile of that owner
  //await task.populate('owner').execPopulate()
  //console.log(task.owner)

  //Find User by their ID

  const user = await User.findById('5fbe2c474e90e03b2b3ebc7a')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

// File upload in express
const multer = require('multer')
const upload = new multer({
  dest: 'images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return callback(new Error('Please upload a Word documenr'))
    }

    callback(undefined, true)
  },
})

const errorMiddleware = (req, res, next) => {
  throw new Error('From my middleware')
}
app.post(
  '/upload',
  upload.single('upload'),
  (req, res) => res.send(),
  (err, req, res, next) => {
    res.status(400).send({ error: err.message })
  }
)

//main()
