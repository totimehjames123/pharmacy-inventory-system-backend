const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    unitPrice: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("stock", stockSchema)