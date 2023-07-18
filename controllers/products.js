const Product = require("../models/products");

const getAdminProduct = (req, res, next) => {
  Product.fetchAll((data) => {
    res.render("admin/products", {
      products: data,
      pageTitle: "Admin product",
      formsCSS: true,
      productCSS: true,
      activeAdminProduct: true,
    });
  });
};

const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const postAddProduct = (req, res, next) => {
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

module.exports = {
  getAdminProduct,
  getAddProduct,
  postAddProduct,
};
