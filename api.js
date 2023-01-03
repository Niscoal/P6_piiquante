const express = require("express");
const api = express();

api.use((req, res, next) => {
    console.log("premier texte");
    next();
});

api.use((req, res, next) => {
    res.json({ message: "Requête reçue" });
});

module.exports = api;
