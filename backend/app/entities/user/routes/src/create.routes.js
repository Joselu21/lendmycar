const ModelsService = require("@services/models.service");

module.exports = { 
    
    create : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/user/",
            [
                User.Middlewares.checkRequiredKeys
            ],
            User.Controller.createUser
        );
    }

};