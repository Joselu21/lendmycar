const DbService = require("@services/db.service");

const mongoose = DbService.get();

const coordinatesSchema = require("@entities/auxiliarSchemas/coordinates.schema");

const shareSchema = new mongoose.Schema({
    offer_price : {
        type : Number,
        required : true,
    },
    offer_start_date : {
        type : Date,
        required : true,
    },
    offer_end_date : {
        type : Date,
        required : true,
    },
    offer_start_location : {
        type : coordinatesSchema,
        required : true,
        index : "2dsphere",
    },
    offer_end_location : {
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

module.exports = shareSchema;