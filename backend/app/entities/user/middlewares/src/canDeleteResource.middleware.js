
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
    if(req.token_decoded.uid != req.params.user_id)
    {
        return res.status(403).json({
            error_type: "FORBIDDEN",
            error_message: "You are not allowed to delete this resource",
            error_data: {
                req: req.body
            }
        });
    }
    next();
}

module.exports = canDeleteResource;

