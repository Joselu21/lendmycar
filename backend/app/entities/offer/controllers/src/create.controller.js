const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new offer
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createOffer(req, res) 
{
    const Offer = ModelsService.Models.Offer;
    let transaction = await Offer.transaction(DbService.get());
    try 
    {
        req.body.user = req.token_decoded.uid;
        const offer = await Offer.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(offer.toJSON());
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
    createOffer
};