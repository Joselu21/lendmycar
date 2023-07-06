const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Create new reservation
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createReservation(req, res) 
{
    const Reservation = ModelsService.Models.Reservation;
    try 
    {
        req.body.user = req.token_decoded.uid;
        const reservation = await Reservation.createOne(req.body);
        return res.status(201).json(reservation.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    createReservation
};