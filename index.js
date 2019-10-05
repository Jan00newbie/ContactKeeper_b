const express = require('express')
const app = express();
const connectDB = require('./config/db')

//import routs
const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')

//setup middleware functions
app.use(express.json({extended: false}))

//connect to database
connectDB()

//routes
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/contact', contactsRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Port: ${PORT}`))