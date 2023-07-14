const express = require("express");
const path = require("path");
const rootDir = require("./util/path");
const expressHbs = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

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

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoute);
app.use("/admin", adminData.routes);

app.use("/", (req, res, next) => {
	res.render("404", { pageTitle: "Page not found" });
});
app.listen(3000);
