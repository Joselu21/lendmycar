const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const imageSchema = require("@entities/auxiliarSchemas/image.schema.js");

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    user_email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    user_name: {
        type: String,
        required: true,
        trim: true,
    },
    user_image: {
        type: imageSchema,
        required: false,
    },
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("User", userSchema);
const User = new KaindaModel(tmpModel);
module.exports = User;
