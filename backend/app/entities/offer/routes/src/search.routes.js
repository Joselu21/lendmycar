const ModelsService = require("@services/models.service");
const { tokenOptional } = require("@services/auth.service");

module.exports = {
    
    searchRent : function (app) 
    {
        const Offer = ModelsService.Models.Offer;
        app.get(
            "/search/rent/",
            [
                tokenOptional
            ],
            Offer.Controller.searchRent
        );
    },

    searchShare : function (app) 
    {
        const Offer = ModelsService.Models.Offer;
        app.get(
            "/search/share/",
            [
                tokenOptional
            ],
            Offer.Controller.searchShare
        );
    }

};