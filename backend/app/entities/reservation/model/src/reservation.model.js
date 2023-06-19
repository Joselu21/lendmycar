const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const reservationSchema = new mongoose.Schema({
    // TODO: Fill the fields of the schema
}, {
    timestamps: true,

});

const tmpModel = mongoose.model("Reservation", reservationSchema);
const Reservation = new KaindaModel(tmpModel);
module.exports = Reservation;
