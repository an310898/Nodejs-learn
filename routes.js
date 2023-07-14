const fs = require("fs");

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;
	console.log(url);
	if (url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.write(
			"<html><head><title>Hello from node server</title><body><form action='/message' method='POST'><input type='text' name='message'/><button>submit</button></form></body></html>"
		);
		return res.end();
	}
	if (url === "/message" && method === "POST") {
		const body = [];

		req.on("data", (chunk) => {
			body.push(chunk);
		});
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			fs.appendFileSync("message.txt", parsedBody.split("=")[1] + "\n");
		});
		res.statusCode = 302;
		res.setHeader("Location", "/");
		return res.end();
	}
};

module.exports = requestHandler;
