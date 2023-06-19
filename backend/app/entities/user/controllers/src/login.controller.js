const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const AuthService = require("@services/auth.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

async function logInPassword(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        let user_email = req.body.user_email?.toLowerCase();
        let user = await User.findOne({ user_email: user_email });
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "INVALID_CREDENTIALS",
                error_message: "Invalid username or password.",
                error_data: {
                    error_code: "INVALID_CREDENTIALS",
                    user_email: user_email,
                    element: "user_password",
                }
            });
        }
        const token = await AuthService.createCustomToken(user._id, user.toJSON());
        return res.status(200).json({ custom_token: token, user_session: user.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

async function logInGoogle(req, res) 
{
    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());
    try 
    {
        // We verify the token with Firebase
        const decoded_token = await AuthService.verifyFirebaseAccessToken(req.body._tokenResponse.idToken);
        const user_id = decoded_token.uid;
        const user_email = decoded_token.email ?? req.body.user.providerData[0].email;
        // We check if the user exists in our database
        let user = await User.findOne({ user_email: user_email }, { transaction });
        // If the user doesn't exist, we create it
        if (!user) 
        {
            user = await User.createOne({
                _id: user_id,
                user_email: user_email,
                user_name: decoded_token.displayName ?? decoded_token.name,
            }, { transaction });
        }
        const response = await AuthService.createCustomToken(user_id, user.toJSON());
        await transaction.commit();
        return res.status(200).json({ custom_token: response, user_session: user.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

async function logInIdToken(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        let user_email = req.body.user_email?.toLowerCase();
        const user_password = req.body.user_password;
        let user = await User.findOne({ user_email: user_email });
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "INVALID_CREDENTIALS",
                error_message: "Invalid username or password.",
                error_data: {
                    error_code: "INVALID_CREDENTIALS",
                    user_email: user_email,
                    element: "user_password",
                }
            });
        }
        const data = await AuthService.logInWithEmailAndPassword(user.user_email, user_password);
        const response = await AuthService.createIdToken(data.localId, user.toJSON());
        return res.status(200).json({ token: response._tokenResponse.idToken, user_session: user.toJSON() });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    logInPassword,
    logInGoogle,
    logInIdToken
};