const fs = require("fs");
const path = require("path");
const Product = require("./products");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(prodId, productPrice) {
    fs.readFile(p, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(content);
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
};
