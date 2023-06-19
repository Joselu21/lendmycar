const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {

        const Offer = ModelsService.Models.Offer;

        // Delete offer by id
        app.delete(
            "/offer/:offer_id/", 
            [
                tokenValid,
                Offer.Middlewares.canDeleteResource,
            ], 
            Offer.Controller.deleteOffer
        );
    }

};