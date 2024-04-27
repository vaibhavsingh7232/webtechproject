const { strict } = require("assert")
const mongoose = require("mongoose")
const userData = new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type: Number
    }
})

const user = mongoose.model("user", userData)
module.exports = user