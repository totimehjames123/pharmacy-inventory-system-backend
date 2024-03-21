const mongoose = require('mongoose')
const stockCollection = require('./stock')

const salesSchema = new mongoose.Schema({
    name: {
        type: String,
        
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
    },
    // stock: [
    //    {type: mongoose.Schema.Types.ObjectId, ref: stockCollection} 
    // ]
})

module.exports = mongoose.model("sales", salesSchema)