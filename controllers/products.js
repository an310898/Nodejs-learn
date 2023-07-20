const Product = require("../models/products");

const getAdminProduct = (req, res, next) => {
  Product.fetchAll().then((prod) => {
    res.render("admin/products", {
      products: prod,
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
  console.log(product);
  product.save();
  res.status(200).redirect("/admin");
};

const getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId).then((prod) => {
    res.render("admin/edit-product", {
      product: prod,
      formsCSS: true,
      productCSS: true,
    });
  });
};
const postEditProduct = (req, res, next) => {
  const product = { ...req.body };

  Product.editById(req.params.prodId, product).then((data) => {
    res.redirect("/admin");
  });
};

const postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.params.prodId).then((status) => {
    if (status.acknowledged) {
      res.redirect("/admin");
    } else {
      throw "something went wrong";
    }
  });
};

module.exports = {
  getAdminProduct,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
