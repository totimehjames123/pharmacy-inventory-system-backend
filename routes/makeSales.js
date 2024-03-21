const salesCollection = require('../models/sales')

const makeSales = async (req, res) => {

    const {name, unitPrice, quantity} = req.body
    
    const addTosales = await salesCollection.create({
        name: name,
        unitPrice: unitPrice,
        quantity: quantity
    })

    if (addTosales){
        res.send({ message: "Medicine add successfully!", status: 200 })
    }
    else {
        res.send ( {message: "Failed to add medicine", status: 502} )
    }
}

module.exports = makeSales