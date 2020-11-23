const express = require('express')
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
} = require('../controllers/user')
const router = new express.Router()
const auth = require('../middlewares/auth')

//******* User endpoints ********

// @POST Request - Creating a new user
router.post('/', createUser)

// @POST Reques - Log in
router.post('/login', loginUser)

// @GET Request - Fetching all users
router.get('/me', auth, getUsers)

// @GET Request - Fetching user by ID
router.get('/:id', getUser)

// @PATCH Request - Updating the user
router.patch('/:id', updateUser)

// @DELTE Request - Deleting the user
router.delete('/:id', deleteUser)

module.exports = router
