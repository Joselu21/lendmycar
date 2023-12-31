const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update reservation
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateReservation(req, res) 
{
    const Reservation = ModelsService.Models.Reservation;
    let transaction = await Reservation.transaction(DbService.get());
    try 
    {
        const reservation = await Reservation.Controller.updateOne(
            req.body,
            {
                [Reservation.modelId]: req.params.reservation_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(reservation.toJSON());
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
    updateReservation
};