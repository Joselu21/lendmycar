const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Delete car by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteCar(req, res) 
{
    const Car = ModelsService.Models.Car;
    try 
    {
        const car = await Car.deleteOne({
            _id : req.params.car_id,
            car_owner: req.token_decoded.uid
        });
        return res.status(200).json(car);
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    deleteCar
};