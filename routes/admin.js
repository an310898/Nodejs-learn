const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.send("<h1>Admin</h1>");
});

router.get("/add-product", (req, res, next) => {
	res.send(
		`<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Add</button></form>`
	);
});
router.post("/add-product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

module.exports = router;
