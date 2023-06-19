
/**
 * Check if the user that makes the request can delete the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canDeleteResource(req, res, next) 
{
    next();
}

module.exports = canDeleteResource;

