const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = { 
    
    create : function (app) 
    {

        const Car = ModelsService.Models.Car;

        // Create new car
        app.post(
            "/car/",
            [
                tokenValid,
                Car.Middlewares.canCreateResource,
                Car.Middlewares.checkRequiredKeys
            ],
            Car.Controller.createCar
        );
    }

};