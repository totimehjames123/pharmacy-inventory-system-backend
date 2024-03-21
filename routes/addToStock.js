const stockCollection = require('../models/stock')

const stockRoute = async (req, res) => {

    const {name, unitPrice, quantity} = req.body
    
    const addToStock = await stockCollection.create({
        name: name,
        unitPrice: unitPrice,
        quantity: quantity
    })
    try {
        if (addToStock){
            res.send({ message: "Medicine add successfully!", status: 200 })
        }
        else {
            res.send ( { message: "Failed to add medicine", status: 502 } )
        }
    }
    catch (err) {
        res.send({ message: err }) 
    }
    
}

module.exports = stockRoute