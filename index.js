const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/ussd", (req, res) => {
	const { sessionId, serviceCode, phoneNumber, text } = req.body;

	let response = "";

	if (text === "") {
		response = "Welcome To Demo Service \n";
		response += "1. My account \n";
		response += "2. My phone number";
	} else if (text === "1") {
		response = "CON Choose account information you want to view \n";
		response += "1. Account balance \n";
		response += "2. Account number";
	} else if (text === "2") {
		response = `END Your phone number is ${phoneNumber}`;
	} else if (text === "1*1") {
		response = "END Your account balance is KES 10,000";
	} else if (text === "1*2") {
		response = "END Your account number is ACC1001";
	} else {
		response = "END Invalid input";
	}

	res.set("Content-Type", "text/plain");
	res.send(response);
});

app.listen(port, () => {
	console.log(`USSD app listening at http://localhost:${port}`);
});
