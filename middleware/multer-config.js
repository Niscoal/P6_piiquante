const multer = require("multer");

const fs = require("fs");
const path = require("path");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const imagePath = path.resolve(__dirname, "..", "images");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath);
            console.log("Fichier créé :", imagePath);
        }
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

module.exports = multer({ storage }).single("image");
