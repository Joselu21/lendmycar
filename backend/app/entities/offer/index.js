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
Offer.create_required_keys = [

];

Offer.updateable_keys = [

];

Offer.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Offer.Seeders.data
};

module.exports = Offer;