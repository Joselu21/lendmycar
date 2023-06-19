const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Reservation = ModelsService.Models.Reservation;

        // Delete reservation by id
        app.delete(
            "/reservation/:reservation_id/", 
            [
                deactivateRoute,
                tokenValid,
                Reservation.Middlewares.canDeleteResource,
            ], 
            Reservation.Controller.deleteReservation
        );
    }

};