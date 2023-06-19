const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Offer = ModelsService.Models.Offer;

        // Update offer
        app.put(
            "/offer/:offer_id/", 
            [
                deactivateRoute,
                tokenValid,
                Offer.Middlewares.canUpdateResource,
            ], 
            Offer.Controller.updateOffer
        );
    }

};