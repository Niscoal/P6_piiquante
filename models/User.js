const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userShema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userShema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userShema);
