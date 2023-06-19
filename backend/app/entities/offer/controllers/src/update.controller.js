const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update offer
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateOffer(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    let transaction = await Offer.transaction(DbService.get());
    try 
    {
        const offer = await Offer.Controller.updateOne(
            req.body,
            {
                [Offer.modelId]: req.params.offer_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(offer.toJSON());
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

module.exports = {
    updateOffer
};