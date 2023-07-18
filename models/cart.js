const fs = require("fs");
const path = require("path");
const Product = require("./products");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

const readDataFromFile = (cb) => {
  fs.readFile(p, (err, content) => {
    if (!err) {
      cb(JSON.parse(content));
    } else {
      cb(false);
    }
  });
};

module.exports = class Cart {
  static addProduct(prodId, productPrice) {
    readDataFromFile((content) => {
      let cart = { products: [], totalPrice: 0 };
      if (content) {
        cart = content;
      }

      const exitsIndexItem = cart.products.findIndex(
        (prod) => prod.id === +prodId
      );
      if (exitsIndexItem != -1) {
        cart.products[exitsIndexItem].qty += 1;
      } else {
        cart.products.push({ id: +prodId, qty: 1 });
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFileSync(p, JSON.stringify(cart));
    });
  }

  static deleteCartItem(prodId, prodPrice) {
    readDataFromFile((content) => {
      let cart = content;
      const cartProduct = cart.products.find((x) => x.id === +prodId);

      const totalAmountDeletedProduct = cartProduct.qty * prodPrice;
      cart.products = cart.products.filter((prod) => prod.id !== +prodId);
      cart.totalPrice -= totalAmountDeletedProduct;
      fs.writeFileSync(p, JSON.stringify(cart));
    });
  }
};
