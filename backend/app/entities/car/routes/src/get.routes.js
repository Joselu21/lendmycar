const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) 
    {

        const Car = ModelsService.Models.Car;

        app.get(
            "/car/me",
            [
                tokenValid,
            ],
            Car.Controller.getAllCars
        );
    },

    get : function (app) 
    {

        const Car = ModelsService.Models.Car;

        // Get car by id
        app.get(
            "/car/:car_id/",
            [
                deactivateRoute,
                tokenValid,
                Car.Middlewares.canReadResource,
            ],
            Car.Controller.getCarById
        );
    }

};