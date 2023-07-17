const Product = require("../models/products");

exports.getShop = (req, res, next) => {
	Product.fetchAll()
		.then((data) => {
			res.render("shop", {
				products: data,
				show: data.length > 0,
				productCSS: true,
				pageTitle: "My shop",
				activeShop: true,
			});
		})
		.catch((err) => console.log(err));
};
