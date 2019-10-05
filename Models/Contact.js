const mongoose = require('mongoose')

const contact = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    
})