const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new car
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createCar(req, res) 
{
    const Car = ModelsService.Models.Car;
    let transaction = await Car.transaction(DbService.get());
    try 
    {
        req.body.car_owner = req.token_decoded.uid;
        const car = await Car.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(car.toJSON());
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
    createCar
};