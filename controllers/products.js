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

const getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId, (prod) => {
    res.render("admin/edit-product", {
      product: prod,
      formsCSS: true,
      productCSS: true,
    });
  });
};
const postEditProduct = (req, res, next) => {
  const product = { id: +req.params.prodId, ...req.body };
  Product.editById(product, (status) => {
    if (status) {
      res.redirect("/admin");
    }
  });
};

const postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.params.prodId);
  res.redirect("/admin");
};

module.exports = {
  getAdminProduct,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
