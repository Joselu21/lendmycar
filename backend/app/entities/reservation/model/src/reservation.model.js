const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const reservationSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "User",
        required: true,
        autopopulate: true,
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
        autopopulate: true,
    },
    reservation_seats: {
        type: Number,
        required: false,
    },
    reservation_dates: {
        date_start: {
            type: Date,
            required: false,
        },
        date_end: {
            type: Date,
            required: false,
        }
    },
}, {
    timestamps: true,
});

const tmpModel = mongoose.model("Reservation", reservationSchema);
const Reservation = new KaindaModel(tmpModel);
module.exports = Reservation;
