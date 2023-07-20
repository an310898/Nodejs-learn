const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    db.collection("products")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    return getDb()
      .collection("products")
      .find()
      .toArray()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    return getDb()
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static editById(id, product) {
    return getDb()
      .collection("products")
      .replaceOne({ _id: new ObjectId(id) }, product)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(id) {
    return getDb()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
