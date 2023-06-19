const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {
    
    delete : function (app) 
    {

        const User = ModelsService.Models.User;

        // Delete user by id
        app.delete(
            "/user/:user_id/", 
            [
                tokenValid,
                User.Middlewares.canDeleteResource,
            ], 
            User.Controller.deleteUser
        );
    }

};