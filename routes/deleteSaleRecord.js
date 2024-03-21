const salesCollection = require('../models/sales');

const deleteSaleRecord = async (req, res) => {
  const { id } = req.body;

  try {
    // Assuming your model has a field named "_id" for MongoDB's default ObjectId
    const deletedStock = await salesCollection.deleteOne({ _id: id });

    if (deletedStock.deletedCount > 0) {
      res.send({ message: "Record deleted successfully!", status: 200 });
    } else {
      res.send({ message: "Record not found", status: 404 });
    }
  } catch (error) {
    console.error('Error deleting Record:', error);
    res.status(500).send({ message: 'Internal Server Error', status: 500 });
  }
};

module.exports = deleteSaleRecord;
