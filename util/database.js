const { MongoClient } = require("mongodb");

let _db;

const uri = "<ConnectionString>";

const mongoClient = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

function getDb() {
  if (_db) {
    return _db;
  }
  throw "No DB found";
}

module.exports = { mongoClient, getDb };
