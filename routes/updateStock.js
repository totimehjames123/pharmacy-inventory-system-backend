const stockCollection = require('../models/stock')

const updateStock = async (req, res) => {
    const { id, name, unitPrice, quantity } = req.body;

    try {
        // Find the document with the given ID and update its fields
        const updatedStock = await stockCollection.updateOne(
            { _id: id }, // Assuming "_id" is the field that represents the unique identifier
            { $set: { name, unitPrice, quantity } }
        );

        // Check if the update was successful
        if (updatedStock.nModified > 0) {
            res.send({ message: "Medicine updated successfully!", status: 200 });
        } else {
            res.send({ message: "No matching record found or no changes made", status: 404 });
        }
    } catch (error) {
        console.error("Error updating medicine:", error);
        res.status(500).send({ message: "Internal server error", status: 500 });
    }
};

module.exports = updateStock;
