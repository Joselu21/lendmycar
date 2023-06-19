const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

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
    let transaction = await Reservation.transaction(DbService.get());
    try 
    {
        const reservation = await Reservation.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(reservation.toJSON());
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
    createReservation
};