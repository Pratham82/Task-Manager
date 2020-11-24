const express = require('express')
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  logOut,
  logOutAll,
} = require('../controllers/user')
const router = new express.Router()
const auth = require('../middlewares/auth')

//******* User endpoints ********

// @POST Request - Creating a new user
router.post('/', createUser)

// @POST Reques - Log in
router.post('/login', loginUser)

// @POST Request  - Logout
router.post('/logout', auth, logOut)

// @POST Request - Logout from all accounts, deleting all tokens
router.post('/logOutAll', auth, logOutAll)

// @GET Request - Sending the user who is logged in
router.get('/me', auth, getUsers)

// @GET Request - Fetching user by ID
router.get('/:id', getUser)

// @PATCH Request - Updating the user
router.patch('/me', auth, updateUser)

// @DELTE Request - Deleting the user
router.delete('/:me', auth, deleteUser)

module.exports = router
