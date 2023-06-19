const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Offer = ModelsService.Models.Offer;

        // Create new offer
        app.post(
            "/offer/",
            [
                tokenValid,
                Offer.Middlewares.canCreateResource,
                Offer.Middlewares.checkRequiredKeys
            ],
            Offer.Controller.createOffer
        );
    }

};