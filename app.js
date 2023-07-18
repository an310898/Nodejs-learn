const express = require("express");
const path = require("path");
const rootDir = require("./util/path");
const expressHbs = require("express-handlebars");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const fileNotFoundController = require("./controllers/404");
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

app.use(shopRoute);
app.use("/admin", adminRoute);

app.use("/", fileNotFoundController.get404);
app.listen(3000);
