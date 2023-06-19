const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all offers
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllOffers(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    try 
    {
        const offers = await Offer.findMany({
            user : req.token_decoded.uid
        });
        return res.status(200).json(offers);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get offer by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getOfferById(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    try 
    {
        const offer = await Offer.findById(req.params.offer_id);
        if (!offer) 
        {
            throw new Offer.Exceptions.OfferNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.offer_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(offer.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllOffers,
    getOfferById
};