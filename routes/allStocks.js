const stockCollection = require('../models/stock');

const allStock = async (req, res) => {
    try {
        // Use async/await to wait for the database query
        const fetchAllStocks = await stockCollection.find({});

        // Check if there is any data
        if (fetchAllStocks.length > 0) {
            res.status(200).json({ stocks: fetchAllStocks });
        } else {
            // If no data is found, you can send an appropriate response
            res.status(404).json({ message: 'No stocks found' });
        }
    } catch (error) {
        console.error('Error fetching stock data:', error); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = allStock;
