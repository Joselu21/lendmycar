const DbService = require("@services/db.service");

const mongoose = DbService.get();

const coordinatesSchema = require("@entities/auxiliarSchemas/coordinates.schema");

const rentSchema = new mongoose.Schema({
    offer_price : {
        type : Object,
        required : true,
        price_per_day : {
            type : Number,
            required : true,
        },
    },
    location : {
        type : coordinatesSchema,
        required : true,
        index : "2dsphere",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

module.exports = rentSchema;