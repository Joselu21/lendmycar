const ImageService = require("@services/image.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const ExceptionService = require("@services/exception.service");

/**
 * Create new URL for direct upload image
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function uploadImage(req, res) 
{
    const mongoose = DbService.mongoose;
    try 
    {
        const db_id = new mongoose.Types.ObjectId();
        const image_id = "lendmycar_" + db_id + "_" + req.token_decoded.uid;
        const url = await ImageService.uploadImageUrl(image_id);
        return res.status(201).json({ 
            ...url 
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    uploadImage,
};