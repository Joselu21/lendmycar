const Car = require("@entities/car/model");

Car.Controller = require("@entities/car/controllers");
Car.Routes = require("@entities/car/routes");
Car.Exceptions = require("@entities/car/exceptions");
Car.Seeders = require("@entities/car/seeders");
Car.Middlewares = require("@entities/car/middlewares");
Car.Validators = require("@entities/car/validators");

/**
 * VARIABLES
*/
Car.create_required_keys = [
    "car_name",
    "car_description",
];

Car.updateable_keys = [
    "car_name",
    "car_description",
    "car_image"
];

// TODO: Change this when not needed
Car.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Car.Seeders.data
};

module.exports = Car;