const User = require('../models/user')

const createUser = async (req, res) => {
  // Creating user from the requested json object
  const user = new User(req.body)

  // Using async await
  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const getUsers = async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    return !user ? res.status(404).send() : res.status(302).send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const getUser = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err.message)
  }
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
    // Here the first parameter is the ID to find, 2nd is the new data that we want to update and third are the options.
    /*const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })*/

    // Dynamically changing the data from the database (For using the middleware)
    // Find the user by ID
    const user = await User.findById(req.params.id)

    // Update every property given in the body with that specific user
    updates.map(update => (user[update] = req.body[update]))

    //Wait till the user is updated, Out middleware will be executed here
    await user.save()

    return !user ? res.status(404).send() : res.status(200).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    return !user ? res.status(404).send() : res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser }
