const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "user.png",
    },
    dateOfRegistration: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", userSchema)