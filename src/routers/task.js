const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/task')

//****** Task Endpoints ********

// @POST Request - Creating  a new task
router.post('/', auth, createTask)

// @GET Request - Fetching all Tasks
router.get('/', getTasks)

// @GET Request - Find the task by ID
router.get('/:id', getTask)

// @PATCH Request - Updating the Tasks
router.patch('/:id', updateTask)

// @DELETE Request - Deleting the task
router.delete('/:id', deleteTask)

module.exports = router
