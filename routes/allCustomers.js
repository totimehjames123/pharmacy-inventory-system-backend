const Sales = require('./../models/sales'); // Adjust the path to your model

// Endpoint to fetch unique customer names based on a query
const allCustomers = async (req, res) => {
  try {
    const query = req.query.query || '';
    
    // Use `distinct` to get unique customer names
    const customers = await Sales.distinct('customerName', {
      customerName: new RegExp(query, 'i') // Case-insensitive match
    });
    
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = allCustomers;
