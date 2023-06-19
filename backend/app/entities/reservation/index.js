const Reservation = require("@entities/reservation/model");

Reservation.Controller = require("@entities/reservation/controllers");
Reservation.Routes = require("@entities/reservation/routes");
Reservation.Exceptions = require("@entities/reservation/exceptions");
Reservation.Seeders = require("@entities/reservation/seeders");
Reservation.Middlewares = require("@entities/reservation/middlewares");
Reservation.Validators = require("@entities/reservation/validators");

/**
 * VARIABLES
*/
// TODO: Fill this
Reservation.create_required_keys = [

];

// TODO: Fill this
Reservation.updateable_keys = [

];

// TODO: Change this when not needed
Reservation.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Reservation.Seeders.data
};

module.exports = Reservation;