const stockCollection = require('../models/stock');

const updateStockQuantityAtSalesRoute = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    // Find the stock item with the given name
    const stockItem = await stockCollection.findOne({ name: name });

    if (stockItem) {
      // Subtract req.quantity from the initial quantity
      stockItem.quantity -= quantity;

      // Save the updated stock item
      await stockItem.save();

      res.send({ message: "Sale made successfully!", status: 200 });
    } else {
      res.send({ message: "Stock item not found", status: 404 });
    }
  } catch (error) {
    console.error('Error updating stock quantity:', error);
    res.status(500).send({ message: 'Internal Server Error', status: 500 });
  }
};

module.exports = updateStockQuantityAtSalesRoute;
