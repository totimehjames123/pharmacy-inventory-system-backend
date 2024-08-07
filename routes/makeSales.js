const salesCollection = require('../models/sales');

const makeSales = async (req, res) => {
  const { name, unitPrice, quantity, customerName, email, phoneNumber } = req.body;

  try {
    const addTosales = await salesCollection.create({
      name,
      unitPrice,
      quantity,
      customerName,
      email, 
      phoneNumber,
    });

    if (addTosales) {
      res.status(200).send({ message: "Sale recorded successfully!" });
    } else {
      res.status(502).send({ message: "Failed to record sale" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = makeSales;
