const express = require("express");
const mongoose = require("mongoose");

const UserRoutes = require("./routes/user");
const path = require("path");

const app = express();

mongoose.set("strictQuery", true);
mongoose
    .connect(
        "mongodb+srv://niscoal:Gi50s9y0OOpyCkhd@cluster0.qzd5eor.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", UserRoutes);

module.exports = app;
