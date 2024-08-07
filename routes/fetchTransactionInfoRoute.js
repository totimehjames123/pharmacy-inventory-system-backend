const mongoose = require('mongoose');
const stockCollection = require('../models/stock');
const salesCollection = require('../models/sales');

const fetchTransactionInfoRoute = async (req, res) => {
  try {
    // Fetch stock data
    const stockData = await stockCollection.find();
    const salesData = await salesCollection.find().sort({ date: -1 });

    // Fetch the latest transaction for each customer and calculate sum of all transactions
    const latestSalesData = await salesCollection.aggregate([
      { $sort: { date: -1 } }, // Sort by date in descending order
      { 
        $group: {
          _id: "$customerName",
          customerName: { $first: "$customerName" },
          date: { $first: "$date" },
          name: { $first: "$name" },
          quantity: { $first: "$quantity" },
          unitPrice: { $first: "$unitPrice" },
          phoneNumber: { $first: "$phoneNumber" }, // Assuming you have phone number field
          email: { $first: "$email" }, // Assuming you have email field
          status: { $first: "$status" }, // Assuming you have status field
          sumOfAllTransactions: { $sum: { $multiply: ["$quantity", "$unitPrice"] } } // Calculate sum of all transactions
        }
      }
    ]);

    // Calculate today's sales data
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const todaysSales = salesData.filter(sale => 
      sale.date.toISOString().split('T')[0] === today
    );
    
    const medicinesSoldToday = todaysSales.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalSalesToday = todaysSales.length;
    
    // Calculate overall sales data
    const overallMedicinesSold = salesData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalSalesOverall = salesData.length;
    const totalStockOverall = salesData.length;
    
    // Total value of stock items
    const totalAmountInStock = stockData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    // Calculate active customers who made a purchase in the past 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const activeCustomers = new Set(
      salesData
        .filter(sale => new Date(sale.date) >= threeDaysAgo)
        .map(sale => sale.customerName)
    );

    // Calculate total number of distinct customers
    const totalCustomers = new Set(salesData.map(sale => sale.customerName)).size;
    
    // Latest purchase date
    const lastPurchase = latestSalesData.reduce((latest, sale) => 
      new Date(latest) > new Date(sale.date) ? latest : sale.date, 
      new Date(0)
    );

    // Convert sales data to include phone number, email, and status
    const customerLastPurchase = latestSalesData.map(sale => ({
      customerName: sale.customerName,
      date: sale.date,
      medicineName: sale.name,
      quantity: sale.quantity,
      price: sale.unitPrice,
      phoneNumber: sale.phoneNumber,
      email: sale.email,
      status: sale.status,
      sumOfAllTransactions: sale.sumOfAllTransactions // Include sum of all transactions
    }));

    // Prepare response
    res.json({
      stockData,
      salesData,
      lastSalesData: latestSalesData, // Use latest sales data
      totalMedicines: stockData.length,
      medicinesSold: medicinesSoldToday,
      overallMedicinesSold,
      totalSales: totalSalesToday,
      totalSalesOverall,
      totalStock: stockData.length,
      totalStockOverall,
      activeCustomers: activeCustomers.size,
      totalCustomers,
      lastPurchase,
      customerLastPurchase, // Include last medicine bought by each customer
      totalAmountInStock,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = fetchTransactionInfoRoute;
