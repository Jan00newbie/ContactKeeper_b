const express = require('express')
const app = express();
const connectDB = require('./config/db')

//import routs
const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

//setup middleware functions
app.use(express.json({extended: false}))

//connect to database
connectDB()

//routes
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/contacts', contactsRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Port: ${PORT}`))