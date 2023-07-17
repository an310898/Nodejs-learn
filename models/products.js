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
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		if (fs.existsSync(p)) {
			readDataFromFile()
				.then((data) => {
					console.log();
					data.push({
						id: data.length === 0 ? 1 : data[data.length - 1].id + 1,
						...this,
					});
					fs.writeFile(p, JSON.stringify(data), (err) => {
						console.log(err);
					});
				})
				.catch((err) => {
					this.save();
				});
		} else {
			if (
				!fs.existsSync(path.join(path.dirname(require.main.filename), "data"))
			) {
				fs.mkdirSync(path.join(path.dirname(require.main.filename), "data"));
			}
			fs.writeFileSync(p, "[]");
			this.save();
		}
	}

	static delete(id) {
		readDataFromFile().then((data) => {
			data = data.filter((x) => x.id !== +id);
			fs.writeFile(p, JSON.stringify(data), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll() {
		return readDataFromFile()
			.then((data) => data)
			.catch(() => []);
	}
};
