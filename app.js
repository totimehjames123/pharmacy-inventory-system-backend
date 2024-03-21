const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

// Import MongoDB connection
const connection = require("./config")

//Import routes
const signupRoute = require("./routes/signupRoute")
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

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


//ALL ROUTES

app.get("/", (req, res) => {
    res.send("welcome to qsm ride")
})

//Login route
app.post("/login", loginRoute)

//Signup route (name, email)
app.post("/signup", signupRoute)

//Add medicine to stock
app.post ("/addToStock", addToStock)

//List all stocks
app.get ("/allStocks", allStocks)

app.get ("/allSales", allSales) 

//Make Sales
app.post ("/deleteSales", deleteSales)

app.post ("/deleteStock", deleteStock)

app.post ("/updateStock", updateStock)
app.post ("/makeSales", makeSales)
app.post ("/deleteSaleRecord", deleteSaleRecord)

app.post ("/updateStockQuantityAtSales", updateStockQuantityAtSalesRoute)


//Running the app
app.listen(5000, () => {
    console.log("App is running...")
})
