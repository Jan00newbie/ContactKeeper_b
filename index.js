const express = require('express')
const app = express();

const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')

console.log()

const apiPath = '/api/'

app.use(`${apiPath}users`, usersRoute)
app.use(`${apiPath}auth`, authRoute)
app.use(`${apiPath}contact`, contactsRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Port: ${PORT}`))