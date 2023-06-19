const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all cars
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllCars(req, res) 
{
    const Car = ModelsService.Models.Car;
    try 
    {
        const response = await Car.findPaginated({
            car_owner: req.token_decoded.uid
        }, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(car => car.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get car by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getCarById(req, res) 
{
    const Car = ModelsService.Models.Car;
    try 
    {
        const car = await Car.findById(req.params.car_id);
        if (!car) 
        {
            throw new Car.Exceptions.CarNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.car_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(car.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllCars,
    getCarById
};