const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configuration du middleware pour analyser les requêtes entrantes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Définir une route POST pour gérer les requêtes USSD
app.post("/ussd", (req, res) => {
	const { sessionId, serviceCode, phoneNumber, text } = req.body;

	let response = "";

	// Logique pour les différentes étapes du service USSD
	if (text === "") {
		response = "Bienvenue au Service Démo \n";
		response += "1. Mon compte \n";
		response += "2. Mon numéro de téléphone";
	} else if (text === "1") {
		response = "CON Choisissez l'information que vous voulez consulter \n";
		response += "1. Solde du compte \n";
		response += "2. Numéro du compte";
	} else if (text === "2") {
		response = `END Votre numéro de téléphone est ${phoneNumber}`;
	} else if (text === "1*1") {
		response = "END Le solde de votre compte est de 10.000 FCFA";
	} else if (text === "1*2") {
		response = "END Votre numéro de compte est ACC1001";
	} else {
		response = "END Entrée invalide";
	}

	// Définir le type de contenu et envoyer la réponse
	res.set("Content-Type", "text/plain");
	res.send(response);
});

// Lancer le serveur et écouter les requêtes sur le port 3000
app.listen(port, () => {
	console.log(`L'application USSD écoute sur http://localhost:${port}`);
});
