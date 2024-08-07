const stockCollection = require('../models/stock');

const stockRoute = async (req, res) => {
    const { name, unitPrice, quantity } = req.body;

    try {
        // Check if the medicine name already exists
        const existingMedicine = await stockCollection.findOne({ name: name });
        if (existingMedicine) {
            return res.status(400).send({ message: `${name} already exists`, status: 400 });
        }

        // Add new medicine to the stock
        const addToStock = await stockCollection.create({
            name: name,
            unitPrice: unitPrice,
            quantity: quantity,
        });

        if (addToStock) {
            res.status(200).send({ message: "Medicine added successfully!", status: 200 });
        } else {
            res.status(502).send({ message: "Failed to add medicine", status: 502 });
        }
    } catch (err) {
        res.status(500).send({ message: err.message, status: 500 });
    }
};

module.exports = stockRoute;
