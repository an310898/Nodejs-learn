const Cart = require("../models/cart");
const Product = require("../models/products");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((productData) => {
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
  Product.fetchAll((productData) => {
    res.render("shop/products-list", {
      products: productData,
      show: productData.length > 0,
      productCSS: true,
      pageTitle: "Product list",
      activeProductsList: true,
    });
  });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id, (product) => {
    res.render("shop/product-detail", {
      product: product,
      productCSS: true,
      pageTitle: "Product",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll((data) => {
    res.render("shop/cart", {
      products: data,
      activeCart: true,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId, (prod) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.redirect("/cart");
};

exports.postDeleteCart = (req, res, next) => {
  const prodId = +req.body.productId;
  Product.findById(prodId, (prod) => {
    Cart.deleteCartItem(prodId, prod.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders");
};
