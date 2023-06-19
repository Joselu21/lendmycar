const Offer = require("@entities/offer/model");

Offer.Controller = require("@entities/offer/controllers");
Offer.Routes = require("@entities/offer/routes");
Offer.Exceptions = require("@entities/offer/exceptions");
Offer.Seeders = require("@entities/offer/seeders");
Offer.Middlewares = require("@entities/offer/middlewares");
Offer.Validators = require("@entities/offer/validators");

/**
 * VARIABLES
*/
// TODO: Fill this
Offer.create_required_keys = [

];

// TODO: Fill this
Offer.updateable_keys = [

];

// TODO: Change this when not needed
Offer.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Offer.Seeders.data
};

module.exports = Offer;