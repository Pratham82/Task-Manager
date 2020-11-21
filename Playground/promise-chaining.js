require('../src/db/mongoose')
const User = require('../src/models/user')

// Using promise chaining for performing multiple tasks in MongoDB
//5fb666a64ae9474e7ce9c682
//

/*
User.findByIdAndUpdate('5fb666a64ae9474e7ce9c682', { age: 50 })
  .then((res, err) => {
    console.log(res)
    // 2nd async operation, finding users with age 55
    return User.countDocuments({ age: 50 })
  })
  .then(res2 => console.log(res2))
  .catch(err => console.log(err))
*/

// Refactoring into Async await
const updateAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return `There are ${count} users with age ${age} `
}

updateAndCount('5fb666a64ae9474e7ce9c682', 36)
  .then(res => console.log(res))
  .catch(err => console.log(err))
