const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {
        const Reservation = ModelsService.Models.Reservation;

        // Delete reservation by id
        app.delete(
            "/reservation/:reservation_id/", 
            [
                tokenValid,
                Reservation.Middlewares.canDeleteResource,
            ], 
            Reservation.Controller.deleteReservation
        );
    }

};