const express = require("express");
const path = require("path");
const expressHbs = require("express-handlebars");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const userModel = require("./models/user");
const fileNotFoundController = require("./controllers/404");
const { mongoClient } = require("./util/database");

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: ".hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  userModel
    .findById("64b8f415a2d500e4f9b73050")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use(shopRoute);
app.use("/admin", adminRoute);

app.use("/", fileNotFoundController.get404);
mongoClient(() => {
  app.listen(3000);
});
