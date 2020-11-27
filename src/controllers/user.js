const User = require('../models/user')

const createUser = async (req, res) => {
  // Creating user from the requested json object
  const user = new User(req.body)

  // Using async await
  try {
    const token = await user.generateAuthToken()
    await user.save()
    res.status(201).send({ user, token })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const getUser = async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    return !user ? res.status(404).send() : res.status(302).send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    /*  return !user
      ? res.status(400).send('Wrong Credentials')
      : res.status(200).send('Successfully logged in')*/
    res.status(200).send({ user, token })
  } catch (err) {
    res.status(400).send(err)
  }
}

const logOut = async (req, res) => {
  try {
    // Remove the current token that is used by the user
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })

    //Save changes to DB
    await req.user.save()
    res.send({ messgae: 'Successfully Logged out' })
  } catch (err) {
    res.status(500).send()
  }
}

const logOutAll = async (req, res) => {
  try {
    // Removing all user tokens
    req.user.tokens = []

    // Save changes to DB
    await req.user.save()
    res.send({ message: 'All tokens removed' })
  } catch (err) {
    res.status(500).send()
  }
}

const getUsers = async (req, res) => {
  /*
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err.message)
  }
  */
  res.send(req.user)
}

const updateUser = async (req, res) => {
  const allowedUpdates = ['age', 'name', 'email', 'password']
  const updates = Object.keys(req.body)
  const isValidOperations = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperations) {
    return res.status(400).send({ error: 'Invalid Update not allowed' })
  }

  try {
    // Dynamically changing the data from the database (For using the middleware)
    // Find the user by ID
    //    const user = await User.findById(req.params._id)

    // Update every property given in the body with that specific user
    updates.map(update => (req.user[update] = req.body[update]))

    //Wait till the user is updated, Out middleware will be executed here
    await req.user.save()

    //return !user ? res.status(404).send() : res.status(200).send(user)
    res
      .status(200)
      .send({ message: 'User updated successfully', user: req.user })
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    //  const user = await User.findByIdAndDelete(req.params._id)
    //    return !user ? res.status(404).send() : res.status(200).send(user)

    await req.user.remove()
    res.send(req.user)
  } catch (err) {
    res.status(500).send(err)
  }
}

const deleteAvatar = async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send({ message: 'Avatar Deleted' })
  } catch (err) {
    console.log(err)
  }
}

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    } else {
      res.set('Content-Type', 'image/png')
      res.status(200).send(user.avatar)
    }
  } catch (err) {
    res.status(400).send()
  }
}

module.exports = {
  createUser,
  loginUser,
  logOut,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  logOutAll,
  deleteAvatar,
  getAvatar,
}
