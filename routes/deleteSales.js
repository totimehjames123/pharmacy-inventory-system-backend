const salesCollection = require('../models/sales')

const deleteSales = async (req, res) => {
    try{
        const makeSales = await salesCollection.deleteMany({})

        if (makeSales){
            res.send({ message: "All sales records deleted successfully!", status: 200 })
        }
        else {
            res.send ( { message: "Failed to make sale", status: 502} )
        }
    }
    catch (error) {
        console.log(error.message)
        res.send({message: error.message})
    }
    
}

module.exports = deleteSales