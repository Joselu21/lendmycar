const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Reservation = ModelsService.Models.Reservation;

        // Get all reservations.
        app.get(
            "/reservation/me",
            [
                tokenValid,
            ],
            Reservation.Controller.getAllReservations
        );
    },

    get : function (app) 
    {

        const Reservation = ModelsService.Models.Reservation;

        // Get reservation by id
        app.get(
            "/reservation/:reservation_id/",
            [
                deactivateRoute,
                tokenValid,
                Reservation.Middlewares.canReadResource,
            ],
            Reservation.Controller.getReservationById
        );
    }

};