const express = require("express");
const productController = require("../controllers/products");

// /admin/{route}
const router = express.Router();
router.get("/", productController.getAdminProduct);
router.get("/add-product", productController.getAddProduct);
router.get("/edit-product/:prodId", productController.getEditProduct);
router.post("/edit-product/:prodId", productController.postEditProduct);
router.post("/delete-product/:prodId", productController.postDeleteProduct);
router.post("/add-product", productController.postAddProduct);
module.exports = router;
