const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all reservations
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllReservations(req, res) 
{
    const Reservation = ModelsService.Models.Reservation;
    try 
    {
        const reservations = await Reservation.findMany({
            user : req.token_decoded.uid
        });
        return res.status(200).json(reservations);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get reservation by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getReservationById(req, res) 
{
    const Reservation = ModelsService.Models.Reservation;
    try 
    {
        const reservation = await Reservation.findById(req.params.reservation_id);
        if (!reservation) 
        {
            throw new Reservation.Exceptions.ReservationNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.reservation_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(reservation.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllReservations,
    getReservationById
};