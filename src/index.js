const express = require('express')
require('./db/mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

// Parsing the JSON using express
app.use(express.json())

// Redirecting the requests to the specific routers
app.use('/users', require('./routers/user'))
app.use('/tasks', require('./routers/task'))

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
