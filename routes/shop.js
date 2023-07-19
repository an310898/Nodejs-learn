const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProductsList);
router.get("/product/:id", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.post("/cart/:prodId", shopController.postCart);
router.post("/cart-delete-item", shopController.postDeleteCart);
router.get("/orders", shopController.getOrders);

module.exports = router;
