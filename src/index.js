const express = require('express')
require('./db/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

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

// Parsing the JSON using express
app.use(express.json())

// Redirecting the requests to the specific routers
app.use('/users', require('./routers/user'))
app.use('/tasks', require('./routers/task'))
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
