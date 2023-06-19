const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Car = ModelsService.Models.Car;

        // Update car
        app.put(
            "/car/:car_id/", 
            [
                deactivateRoute,
                tokenValid,
                Car.Middlewares.canUpdateResource,
            ], 
            Car.Controller.updateCar
        );
    }

};