const productController = require("../controllers/products");
const productData = productController.products;
exports.getShop = (req, res, next) => {
	res.render("shop", {
		products: productData,
		show: productData.length > 0,
		productCSS: true,
		pageTitle: "My shop",
		activeShop: true,
	});
};
