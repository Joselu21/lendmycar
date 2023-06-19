const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const offerSchema = new mongoose.Schema({
    car : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Car",
        required : true,
        autopopulate : true,
    },
    user : {
        type : String,
        ref : "User",
        required : true,
        autopopulate : true,
    },
    offer_name : {
        type : String,
        required : true,
    },
    offer_description : {
        type : String,
        required : true,
    },
    offer_status : {
        type : String,
        enum : ["available", "unavailable"],
        default : "available",
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

const tmpModel = mongoose.model("Offer", offerSchema);
const Offer = new KaindaModel(tmpModel);

const rentSchema = require("./schemas/rent.schema");
const Rent = new KaindaModel(tmpModel.discriminator("Rent", rentSchema));
Offer.Rent = Rent;

const shareSchema = require("./schemas/share.schema");
const Share = new KaindaModel(tmpModel.discriminator("Share", shareSchema));
Offer.Share = Share;

module.exports = Offer;
