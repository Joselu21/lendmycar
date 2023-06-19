const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Update user
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateUser(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.subModel.findOneAndUpdate(
            {
                [User.modelId]: req.params.user_id ?? req.token_decoded.uid,
            },
            req.body,
            {
                new: true,
            }
        );
        return res.status(200).json(user.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateUser
};