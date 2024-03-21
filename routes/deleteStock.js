const stockCollection = require('../models/stock');

const deleteStock = async (req, res) => {
  const { id } = req.body;

  try {
    // Assuming your model has a field named "_id" for MongoDB's default ObjectId
    const deletedStock = await stockCollection.deleteOne({ _id: id });

    if (deletedStock.deletedCount > 0) {
      res.send({ message: "Stock item deleted successfully!", status: 200 });
    } else {
      res.send({ message: "Stock item not found", status: 404 });
    }
  } catch (error) {
    console.error('Error deleting stock item:', error);
    res.status(500).send({ message: 'Internal Server Error', status: 500 });
  }
};

module.exports = deleteStock;
