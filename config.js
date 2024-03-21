
const mongoose = require("mongoose")
MONGODB_URI = "mongodb://totimehjames123:password_123@ac-szdk22h-shard-00-00.qoztrzt.mongodb.net:27017,ac-szdk22h-shard-00-01.qoztrzt.mongodb.net:27017,ac-szdk22h-shard-00-02.qoztrzt.mongodb.net:27017/pharmacy-inventory-system?ssl=true&replicaSet=atlas-12rmyw-shard-0&authSource=admin&retryWrites=true&w=majority"
module.exports = mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
.then(
    console.log("Connected to MongoDB Successfully!")
).catch((error) => {
    console.error("Failed to connect!", error.message)
})


// qLrMlJ2XItaKW2H6
