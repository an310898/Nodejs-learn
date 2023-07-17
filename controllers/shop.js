const Product = require("../models/products");

exports.getShop = (req, res, next) => {
	Product.fetchAll().then((productData) => {
		res.render("shop", {
			products: productData,
			show: productData.length > 0,
			productCSS: true,
			pageTitle: "My shop",
			activeShop: true,
		});
	});
};
