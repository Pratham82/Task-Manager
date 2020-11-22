const Task = require('../models/task')

const createTask = async (req, res) => {
  const task = new Task(req.body)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const getTask = async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
    return !task ? res.status(404).send() : res.status(201).send(task)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const updateTask = async (req, res) => {
  const allowedTasks = ['description', 'status']
  const taskUpdates = Object.keys(req.body)
  const validateTasks = taskUpdates.every(task => allowedTasks.includes(task))
  if (!validateTasks) {
    return res.status(400).send({ error: 'Invalid update not allowed' })
  }
  try {
    const newTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    return !newTask ? res.status(404).send() : res.status(200).send(newTask)
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    return !task
      ? res.status(404).send({ message: 'Task with Given ID is not present' })
      : res.status(200).send(task)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask }
