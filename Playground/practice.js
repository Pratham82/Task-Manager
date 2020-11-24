// with toJSON we can manipulate the data, which is returned by JSON.stringify()
const pet = {
  user: 'Joey',
}

pet.toJSON = function () {
  return {}
}

console.log(JSON.stringify(pet))
console.log(JSON.stringify(pet))
