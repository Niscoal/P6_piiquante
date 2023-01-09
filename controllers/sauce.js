const Sauce = require("../models/Sauce");
const fs = require("fs");

// sauce creation by user with Sauce model then others specifieds parameters
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
        likes: 0,
        dislikes: 0,
    });
    sauce
        .save()
        .then(() => {
            res.status(201).json({ message: "Sauce enregistrée !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Sauce modification
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
        ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };

    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: "Non-autorisé" });
            } else {
                Sauce.updateOne(
                    { _id: req.params.id },
                    { ...sauceObject, _id: req.params.id }
                )
                    .then(() =>
                        res.status(200).json({ message: "Sauce modifiée" })
                    )
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

// Sauce removal
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({
                                message: "Sauce supprimée !",
                            });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

// Getting a sauce by sauce id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(400).json({ error }));
};

// Getting all sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

exports.like = (req, res, next) => {
    Sauce.findById(req.params.id)
        .then((sauce) => {
            console.log("like statut:", req.body.like);
            switch (req.body.like) {
                case 0:
                    console.log("cas zero");
                    break;
                case 1:
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $inc: { likes: 1 } },
                        { $push: { usersLiked: req.body.userId } }
                    )
                        .then(() => {
                            res.status(200).json({
                                message: "Sauce likée !",
                            });
                        })
                        .catch((error) => res.status(400).json({ error }));
                    break;
                case -1:
                    console.log("cas -1");
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $inc: { dislikes: 1 } },
                        { $push: { usersdisliked: req.body.userId } }
                    )
                        .then(() => {
                            res.status(200).json({
                                message: "Sauce likée !",
                            });
                        })
                        .catch((error) => res.status(400).json({ error }));
                    break;
            }
        })
        .catch((error) => res.status(400).json({ error }));
};
