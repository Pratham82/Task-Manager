// with toJSON we can manipulate the data, which is returned by JSON.stringify()
const pet = {
  user: 'Joey',
}

pet.toJSON = function () {
  return {}
}

console.log(JSON.stringify(pet))
console.log(JSON.stringify(pet))

const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
  // Find user by the task
  //const task = await Task.findById('5fbe2ece3ff5b93f5e7c6d85')
  // Populat will take the ID of the owner to being the entire profile of that owner
  //await task.populate('owner').execPopulate()
  //console.log(task.owner)

  //Find User by their ID

  const user = await User.findById('5fbe2c474e90e03b2b3ebc7a')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

//main()
