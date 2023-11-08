const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController")


router.get("/intialize-database", ProductController.intializeDatabase);
router.get("/list-transactions", ProductController.listTransactions);
router.get("/bar-chart-data", ProductController.barChartData)
router.get("/pie-chart-data", ProductController.pieChartData)


module.exports = router;