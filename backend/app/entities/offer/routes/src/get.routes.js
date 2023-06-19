const ModelsService = require("@services/models.service");
const { tokenValid, tokenOptional } = require("@services/auth.service");

module.exports = {
    
    getAll : function (app) 
    {

        const Offer = ModelsService.Models.Offer;

        app.get(
            "/offer/me",
            [
                tokenValid,
            ],
            Offer.Controller.getAllOffers
        );
    },

    get : function (app) 
    {

        const Offer = ModelsService.Models.Offer;

        // Get offer by id
        app.get(
            "/offer/:offer_id/",
            [
                tokenOptional,
                Offer.Middlewares.canReadResource,
            ],
            Offer.Controller.getOfferById
        );
    }

};