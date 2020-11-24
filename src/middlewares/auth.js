const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    // Get the authorization token which is passed by the user
    // If the header is not passed in the header then the error will be thrown
    const token = req.header('Authorization').replace('Bearer ', '')

    // Verify the token if its valid or not
    const decoded = jwt.verify(token, 'secretKey')

    // Find the User with deoced id
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    // Passing the user value to the route handlers
    req.user = user
    req.token = token
    next()
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth
