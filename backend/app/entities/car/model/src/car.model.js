const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const imageSchema = require("@entities/auxiliarSchemas/image.schema.js");

const carSchema = new mongoose.Schema({
    car_name: {
        type: String,
        required: true,
        trim: true,
    },
    car_image: {
        type: imageSchema,
        required: false,
    },
    car_description: {
        type: String,
        required: true,
        trim: true,
    },
    car_owner: {
        type: String,
        ref: "User",
        required: true,
        autopopulate: true,
    },
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("Car", carSchema);
const Car = new KaindaModel(tmpModel);
module.exports = Car;
