const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Delete offer by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteOffer(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    try 
    {
        const offer = await Offer.deleteOne({
            _id : req.params.offer_id,
            user : req.token_decoded.uid
        });
        return res.status(200).json(offer);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    deleteOffer
};