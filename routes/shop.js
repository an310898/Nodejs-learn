const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/products-list", shopController.getProductsList);
router.get("/cart", shopController.getCart);
router.get("/orders", shopController.getOrders);

module.exports = router;
