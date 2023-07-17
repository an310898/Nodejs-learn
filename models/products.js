const fs = require("fs");
const path = require("path");

const p = path.join(
	path.dirname(require.main.filename),
	"data",
	"products.json"
);
const readDataFromFile = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(p, (error, data) => {
			if (error) {
				reject([]);
			} else {
				resolve(JSON.parse(data));
			}
		});
	});
};

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		if (fs.existsSync(p)) {
			readDataFromFile()
				.then((data) => {
					let products = data;
					products.push(this);
					fs.writeFile(p, JSON.stringify(products), (err) => {
						console.log(err);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			fs.writeFileSync(p, "[]");
			this.save();
		}
	}

	static fetchAll() {
		return readDataFromFile()
			.then((data) => data)
			.catch(() => []);
	}
};
