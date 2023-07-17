const express = require("express");
const productController = require("../controllers/products");

const router = express.Router();
router.get("/", productController.getAdminProduct);
router.get("/add-product", productController.getProduct);
router.post("/add-product", productController.addProduct);
router.post("/delete-product", productController.deleteProduct);
module.exports = { routes: router };
