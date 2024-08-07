const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

// Import MongoDB connection
const connection = require("./config")

//Import routes
const addWorker = require("./routes/addWorker")
const loginRoute = require("./routes/loginRoute")
const addToStock = require("./routes/addToStock")
const allStocks = require("./routes/allStocks")
const deleteSales = require("./routes/deleteSales")
const allSales = require("./routes/allSales")
const deleteStock = require("./routes/deleteStock")
const updateStock = require("./routes/updateStock")
const updateStockQuantityAtSalesRoute = require("./routes/updateStockQuantityAtSalesRoute")
const makeSales = require("./routes/makeSales")
const deleteSaleRecord = require("./routes/deleteSaleRecord")
const forgotPasswordRoute = require("./routes/forgotPasswordRoute")
const resetPasswordRoute = require("./routes/resetPasswordRoute")
const fetchTransactionInfoRoute = require("./routes/fetchTransactionInfoRoute")
const fetchWorkers = require("./routes/fetchWorkers")
const deleteWorker = require("./routes/deleteWorker")
const updateWorker = require("./routes/updateWorker")
const allCustomers = require("./routes/allCustomers")
const verifyUser = require("./routes/verifyUser")
const changePassword = require("./routes/changePassword")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


//ALL ROUTES

app.get("/", (req, res) => {
    res.send("welcome to pharmacy ")
})

//Login route
app.post("/login", loginRoute)

//Signup route (name, username, email)
app.post("/add-worker", addWorker)
app.post("/update-worker", updateWorker)

app.post("/forgot-password", forgotPasswordRoute)
app.post("/reset-password", resetPasswordRoute)
app.post("/change-password", changePassword)

//Add medicine to stock
app.post ("/addToStock", addToStock)

//List all stocks
app.get ("/allStocks", allStocks)
app.get("/workers", fetchWorkers)
app.get ("/allSales", allSales) 
app.get ("/all-customers", allCustomers) 
app.post("/verify-user", verifyUser)

//Make Sales
app.post ("/deleteSales", deleteSales)

app.post ("/deleteStock", deleteStock)

app.post ("/updateStock", updateStock)
app.post ("/makeSales", makeSales)

app.post ("/deleteSaleRecord", deleteSaleRecord)
app.get ("/fetch-transaction-info", fetchTransactionInfoRoute)

app.post ("/updateStockQuantityAtSales", updateStockQuantityAtSalesRoute)
app.post("/delete-worker", deleteWorker) 

//Running the app
app.listen(5000, () => {
    console.log("App is running...")
})
