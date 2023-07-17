const Product = require("../models/products");

const getAdminProduct = (req, res, next) => {
	Product.fetchAll().then((data) => {
		res.render("admin/products", {
			products: data,
			pageTitle: "Admin product",
			formsCSS: true,
			productCSS: true,
			activeAdminProduct: true,
		});
	});
};

const getProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "Add product",
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	});
};

const addProduct = (req, res, next) => {
	const reqBody = { ...req.body };

	const product = new Product(
		reqBody.title,
		reqBody.imageUrl,
		reqBody.description,
		reqBody.price
	);
	product.save();
	res.status(200).redirect("/admin");
};

const deleteProduct = (req, res, next) => {
	Product.delete(req.query.id);

	Product.fetchAll().then((data) => {
		res.redirect("/admin");
	});
};

module.exports = {
	getProduct,
	addProduct,
	getAdminProduct,
	deleteProduct,
};
