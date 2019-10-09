const mongoose = require('mongoose')
const config = require('./default.json')

const dbConnectKey = config.mongoURL


const connectDB = async () => {
    try {
        await mongoose.connect(dbConnectKey, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log("Connected to DB")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB