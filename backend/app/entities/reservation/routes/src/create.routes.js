const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) 
    {

        const Reservation = ModelsService.Models.Reservation;

        // Create new reservation
        app.post(
            "/reservation/",
            [
                deactivateRoute,
                tokenValid,
                Reservation.Middlewares.canCreateResource,
                Reservation.Middlewares.checkRequiredKeys
            ],
            Reservation.Controller.createReservation
        );
    }

};