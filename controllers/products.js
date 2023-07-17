const products = [];

const getProduct = (req, res, next) => {
	res.render("add-product", {
		pageTitle: "Add product",
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	});
};

const addProduct = (req, res, next) => {
	products.push({ title: req.body.title });
	res.redirect("/");
};

module.exports = {
	getProduct,
	addProduct,
	products,
};
