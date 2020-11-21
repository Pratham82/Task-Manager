require('../src/db/mongoose')
const { findByIdAndDelete } = require('../src/models/task')
const Task = require('../src/models/task')

// Promise Chaining to find the task by ID and remove it then count incomplete tasks
/*
Task.findByIdAndDelete('5fb8e01d49273e81855cd7b7')
  .then(res => {
    console.log(res)
    return Task.countDocuments({ status: false })
  })
  .then(res2 => console.log(res2))
  .catch(err => console.log(err))
  */

// Refactor with Async await
const deleteTaskAndCount = async id => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ status: false })
  return console.log(`Incomplete tasks ${count}`)
}

deleteTaskAndCount('5fb90ae45e7f3c9d20808190')
  .then(res => console.log(res))
  .catch(err => console.log(err))
