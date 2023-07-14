const express = require("express");
// const bodyParser = require("body-parser");
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use("/", (req, res, next) => {
	next();
});
app.use("/add-product", (req, res, next) => {
	res.send(
		`<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Add</button></form>`
	);
});
app.use("/product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});
app.use("/", (req, res, next) => {
	res.send("<h1>Hello Express</h1>");
});
app.listen(3000);
