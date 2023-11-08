const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  title: String,
  description: String,
  price: Number,
  sold: Boolean,
  dateOfSale: Date,
});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;

