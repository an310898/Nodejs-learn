const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const readDataFromFile = (callback) => {
  fs.readFile(p, (error, data) => {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    readDataFromFile((products) => {
      this.id =
        products.length === 0 ? 1 : products[products.length - 1].id + 1;
      console.log(this);
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static findById(id, cb) {
    readDataFromFile((data) => {
      const product = data.find((p) => p.id === +id);
      cb(product);
    });
  }

  static editById(product, cb) {
    readDataFromFile((data) => {
      let dataArr = data;
      const prodIndex = dataArr.findIndex((x) => x.id === product.id);
      dataArr[prodIndex] = product;

      fs.writeFile(p, JSON.stringify(dataArr), (err) => {
        if (err === null) {
          cb(true);
        }
      });
    });
  }

  static deleteById(id) {
    this.findById(id, (prod) => {
      readDataFromFile((data) => {
        data = data.filter((x) => x.id !== +id);

        fs.writeFile(p, JSON.stringify(data), (err) => {
          if (!err) {
            Cart.deleteCartItem(id, prod.price);
          }
        });
      });
    });
  }

  static fetchAll(cb) {
    readDataFromFile(cb);
  }
};
