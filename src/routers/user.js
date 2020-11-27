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
  uploadAvatar,
} = require('../controllers/user')
const router = new express.Router()
const auth = require('../middlewares/auth')
const multer = require('multer')
const upload = new multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    return !file.originalname.match(/\.(jpg|jpeg|png)$/)
      ? callback(new Error('Please upload images only.'))
      : callback(undefined, true)
  },
})

//******* User endpoints ********

// @POST Request - Creating a new user
router.post('/', createUser)

// @POST Reques - Log in
router.post('/login', loginUser)

// @POST Request  - Logout
router.post('/logout', auth, logOut)

// @POST Request - Logout from all accounts, deleting all tokens
router.post('/logOutAll', auth, logOutAll)

// @POST Request - Endpoint for avatar upload
router.post('/me/avatar', upload.single('avatar'), uploadAvatar)

// @GET Request - Sending the user who is logged in
router.get('/me', auth, getUsers)

// @GET Request - Fetching user by ID
router.get('/:id', getUser)

// @PATCH Request - Updating the user
router.patch('/me', auth, updateUser)

// @DELTE Request - Deleting the user
router.delete('/:me', auth, deleteUser)

module.exports = router
