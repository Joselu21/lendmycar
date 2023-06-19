const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update car
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateCar(req, res) 
{
    const Car = ModelsService.Models.Car;
    let transaction = await Car.transaction(DbService.get());
    try 
    {
        const car = await Car.Controller.updateOne(
            req.body,
            {
                [Car.modelId]: req.params.car_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(car.toJSON());
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
    updateCar
};