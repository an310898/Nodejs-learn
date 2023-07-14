const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
	res.render("shop", {
		products: adminData.products,
		show: adminData.products.length > 0,
		productCSS: true,
		pageTitle: "My shop",
		activeShop: true,
	});
});

module.exports = router;
