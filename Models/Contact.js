const mongoose = require('mongoose')

const contact = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:String,
    phone:String,
    date: {
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Contact', contact)