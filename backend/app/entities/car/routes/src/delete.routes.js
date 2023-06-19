const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {

        const Car = ModelsService.Models.Car;

        // Delete car by id
        app.delete(
            "/car/:car_id/", 
            [
                tokenValid,
                Car.Middlewares.canDeleteResource,
            ], 
            Car.Controller.deleteCar
        );
    }

};