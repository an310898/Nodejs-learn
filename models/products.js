const fs = require("fs");
const path = require("path");
module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		const p = path.join(
			path.dirname(require.main.filename),
			"data",
			"products.json"
		);
		if (fs.existsSync(p)) {
			fs.readFile(p, (error, data) => {
				let products = [];
				if (!error) {
					products = JSON.parse(data);
				}
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err);
				});
			});
		} else {
			fs.writeFileSync(p, "[]");
			this.save();
		}
	}

	static fetchAll() {
		return new Promise((resolve, reject) => {
			const p = path.join(
				path.dirname(require.main.filename),
				"data",
				"products.json"
			);
			fs.readFile(p, (error, data) => {
				if (error) {
					reject(error);
				} else {
					resolve(JSON.parse(data));
				}
			});
		});
	}
};
