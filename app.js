const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
    .connect(
        "mongodb+srv://niscoal:Gi50s9y0OOpyCkhd@cluster0.qzd5eor.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    console.log("premier texte");
    next();
});

app.use((req, res, next) => {
    res.json({ message: "Requête reçue" });
});

module.exports = app;
