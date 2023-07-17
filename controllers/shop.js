const Product = require("../models/products");

exports.getIndex = (req, res, next) => {
	Product.fetchAll().then((productData) => {
		res.render("shop/index", {
			products: productData,
			show: productData.length > 0,
			productCSS: true,
			pageTitle: "My shop",
			activeShop: true,
		});
	});
};

exports.getProductsList = (req, res, next) => {
	Product.fetchAll().then((productData) => {
		res.render("shop/index", {
			products: productData,
			show: productData.length > 0,
			productCSS: true,
			pageTitle: "Product list",
			activeProductsList: true,
		});
	});
};

exports.getCart = (req, res, next) => {
	res.render("shop/cart");
};
exports.getOrders = (req, res, next) => {
	res.render("shop/orders");
};
