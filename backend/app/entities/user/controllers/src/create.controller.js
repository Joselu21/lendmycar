const ModelsService = require("@services/models.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createUser(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        req.body.user_email = req.body.user_email.toLowerCase().trim();
        // Check if email already exists and throw error if it does
        const currentUser = await User.findOne({ user_email: req.body.user_email });
        if (currentUser) 
        {
            throw new User.Exceptions.UserBadRequestException({
                error_message: "Email already exists",
                error_type: "EMAIL_IN_USE",
                error_data: {
                    element: "user_email",
                }
            });
        }
        // Create user in database
        const user = await User.createOne({
            user_email: req.body.user_email,
            user_name: req.body.user_name,
            _id : req.body.user_id,
        });
        // Generate custom token to login user
        const token = await AuthService.createCustomToken(user._id, user.toJSON());
        return res.status(201).json({
            custom_token: token, 
            user_session: user.toJSON()
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createUser,
};