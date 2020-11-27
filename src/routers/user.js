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
  deleteAvatar,
  getAvatar,
} = require('../controllers/user')
const router = new express.Router()
const auth = require('../middlewares/auth')
const sharp = require('sharp')

const multer = require('multer')
const upload = new multer({
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
router.post(
  '/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message })
  }
)

// @GET Request - Get avatars
router.get('/:id/avatar', getAvatar)

// @GET Request - Sending the user who is logged in
router.get('/me', auth, getUsers)

// @GET Request - Fetching user by ID
router.get('/:id', getUser)

// @PATCH Request - Updating the user
router.patch('/me', auth, updateUser)

// @DELTE Request - Deleting the user
router.delete('/:me', auth, deleteUser)

// @DELTE - Delete avatar
router.delete('/me/avatar', auth, deleteAvatar)

module.exports = router
