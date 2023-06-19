const User = require("@entities/user/model");

User.Controller = require("@entities/user/controllers");
User.Routes = require("@entities/user/routes");
User.Exceptions = require("@entities/user/exceptions");
User.Seeders = require("@entities/user/seeders");
User.Middlewares = require("@entities/user/middlewares");
User.Validators = require("@entities/user/validators");

/**
 * VARIABLES
*/
User.create_required_keys = [
    "user_email",
    "user_name",
];

User.updateable_keys = [
    "user_name",
    "user_image",
];

User.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: User.Seeders.data
};

module.exports = User;