const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");

module.exports = {

    uploadImage: function (app) 
    {
        const User = ModelsService.Models.User;

        app.post(
            "/image/upload",
            [
                tokenValid
            ],
            User.Controller.uploadImage
        );

    }
};