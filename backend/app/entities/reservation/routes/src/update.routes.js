const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Reservation = ModelsService.Models.Reservation;

        // Update reservation
        app.put(
            "/reservation/:reservation_id/", 
            [
                deactivateRoute,
                tokenValid,
                Reservation.Middlewares.canUpdateResource,
            ], 
            Reservation.Controller.updateReservation
        );
    }

};