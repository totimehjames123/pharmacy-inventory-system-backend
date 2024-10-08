const salesCollection = require('../models/sales');

const allSales = async (req, res) => {
    try {
        // Use async/await to wait for the database query
        const fetchAllSales = await salesCollection.find({}).sort({ date: -1 });

        // Check if there is any data
        if (fetchAllSales.length > 0) {
            res.status(200).json({ sales: fetchAllSales });
        } else {
            // If no data is found, you can send an appropriate response
            res.status(404).json({ message: 'No sales found' });
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}; 

module.exports = allSales;
