const Product = require("../models/products");

const getProduct = (req, res, next) => {
	res.render("add-product", {
		pageTitle: "Add product",
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	});
};

const addProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.status(200).redirect("/");
};

module.exports = {
	getProduct,
	addProduct,
};
