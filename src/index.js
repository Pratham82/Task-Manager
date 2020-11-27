const express = require('express')
require('./db/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// Parsing the JSON using express
app.use(express.json())

// Redirecting the requests to the specific routers
app.use('/users', require('./routers/user'))
app.use('/tasks', require('./routers/task'))

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
