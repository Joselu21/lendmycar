const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Delete reservation by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteReservation(req, res) 
{
    const Reservation = ModelsService.Models.Reservation;
    try 
    {
        const reservation = await Reservation.deleteOne({
            _id: req.params.reservation_id,
        });
        return res.status(200).json(reservation);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    deleteReservation
};