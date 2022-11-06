const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
      },
    subjects:{
        type : [String],
     },
    spokenlanguages: {
        type : [String],
    },
    location: {
        type : String,
    },
    availability: {
        type : String,   
    },
    role: {
        type : String,
        enum : ['ADMIN','USER'],
        required: true,
        default:'ADMIN'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
})

const User = new mongoose.model("user", userSchema)
module.exports = User;