const Task = require('../models/task')

const createTask = async (req, res) => {
  //Saving the task with userID
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const getTasks = async (req, res) => {
  const match = {}
  const sort = {}
  req.query.status ? (match.status = req.query.status === 'true') : 0
  /*if (req.query.status) {
    match.status = req.query.status === 'true'
  }*/
  if (req.query.sortBy) {
    const sortRequest = req.query.sortBy.split(':')
    sort[sortRequest[0]] = sortRequest[1] === 'desc' ? -1 : 1
  }
  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.tasks)
    // Method 2:
    //const tasks = await Task.find({ owner: req.user._id })
    //res.status(200).send(tasks)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const getTask = async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    //    return !task ? res.status(404).send() : res.status(201).send(task)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const updateTask = async (req, res) => {
  const allowedTasks = ['description', 'status']
  const updates = Object.keys(req.body)
  const validateTasks = updates.every(update => allowedTasks.includes(update))

  if (!validateTasks) {
    return res.status(400).send({ error: 'Invalid update not allowed' })
  }

  try {
    //Refactoring the udpate method, incase we have to add the middleware, so breaking the down the udpate first finding the task by the id and then  updating
    //const task = await Task.findById(req.params.id)
    // Allow only the users of the tasks to update
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

    // Here we are replacing the old tasks with the new tasks
    updates.forEach(update => (task[update] = req.body[update]))

    // Save the new task
    await task.save()

    return !task ? res.status(404).send() : res.status(200).send(task)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteTask = async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    return !task
      ? res.status(404).send({ message: 'Task with Given ID is not present' })
      : res.status(200).send(task)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask }
