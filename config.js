
const mongoose = require("mongoose")
const dotenv = require("dotenv") 

dotenv.config() 

module.exports = mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
.then( 
    console.log("Connected to MongoDB Successfully!")
).catch((error) => {
    console.error("Failed to connect!", error.message)
})


// qLrMlJ2XItaKW2H6
