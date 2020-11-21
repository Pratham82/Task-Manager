require('../src/db/mongoose')
const Task = require('../src/models/task')

// Promise Chaining to find the task by ID and remove it then count incomplete tasks

Task.findByIdAndDelete('5fb8e01d49273e81855cd7b7')
  .then(res => {
    console.log(res)
    return Task.countDocuments({ status: false })
  })
  .then(res2 => console.log(res2))
  .catch(err => console.log(err))
