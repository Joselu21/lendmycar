const { KaindaException, GenericKaindaExceptionHandler } = require("kainda");
const ModelsService = require("@services/models.service");
const DbService = require("@services/db.service");

class ExceptionService 
{
    /**
     * Function that handles all exception types that are thrown by the application.
     * The exception must have a code and a message property. It is recommended to use the kainda standard.
     * @param {Error|KaindaException} error The error object that is thrown by the application, it can be thrown by the application or by Sequelize/Mongoose.
     * @param {object} res The response object. Used to send the response to the client based on the error.
     * @returns {void} Returns nothing.
     * @example
     * const { GenericKaindaExceptions } = require("kainda");
     * try {
     *  throw new GenericKaindaExceptions.Kainda400Exception();
     * } catch (error) {
     *  ExceptionService.handle(error, res);
     * }
     */
    static handle(error, res) 
    {
        // If error is an array, extract the first element, it can happen on validation errors from Sequelize
        if (Array.isArray(error)) 
        {
            error = error[0];
        }

        // If it is a Firebase Error
        error = FirebaseErrorHandler(error);

        // If the error is a user-defined exception or a kainda generated exception
        const { Models } = ModelsService;
        if (error instanceof KaindaException) 
        {
            if (Models) 
            {
                const keys = Object.keys(Models);
                for (const key in keys) 
                {
                    if (Models[keys[key]] && Models[keys[key]].Exceptions[error.name] && error instanceof Models[keys[key]].Exceptions[error.name]) 
                    {
                        return Models[keys[key]].Exceptions[`${keys[key]}ExceptionHandler`](error, res);
                    }
                }
            }
            return GenericKaindaExceptionHandler(error, res);
        }

        if (DbService.mongoose && error instanceof DbService.mongoose.Error) 
        {
            ExceptionService.mongooseHandler(error, res);
        }

        if (DbService.sequelize && error instanceof DbService.sequelize.BaseError) 
        {
            ExceptionService.sequelizeHandler(error, res);
        }

        return ExceptionService.returnGenericException(error, res);

    }

    static returnGenericException(error, res) 
    {
        return ExceptionService.response({
            error_type: "GENERIC_ERROR",
            error_message: "An unknown error has occurred",
            error_code: 500,
            error_data: error
        }, res);
    }

    static response(json, res) 
    {
        return res.status(json.error_code).json(json.body);
    }

    static mongooseHandler(error, res) 
    {
        const data = {
            error_type: error.name ?? "MONGOOSE_ERROR",
            error_message: error.message ?? error.msg ?? "Mongoose error",
            error_code: 500,
            error_data: error
        };

        return ExceptionService.response(data, res);

    }

    static sequelizeHandler(error, res) 
    {
        const data = {
            error_type: error.name ?? error.type ?? error.message ?? "SEQUELIZE_ERROR",
            error_message: error.message ?? error.msg ?? "Sequelize error",
            error_code: 500,
            error_data: error
        };

        return ExceptionService.response(data, res);

    }

}

function FirebaseErrorHandler(error) 
{
    const User = ModelsService.Models.User;
    if (error.response?.data?.error?.message?.includes("TOO_MANY_ATTEMPTS_TRY_LATER") || error.code === "auth/too-many-requests") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "TOO_MANY_ATTEMPTS_TRY_LATER",
            error_message: "Too many attempts, try again later.",
            error_data: {
                error_code: "TOO_MANY_ATTEMPTS_TRY_LATER",
                element: "user_password",
            }
        });
    }
    else if (error.response?.data?.error?.message?.includes("INVALID_OOB_CODE") || error.code === "auth/invalid-action-code") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "INVALID_OOB_CODE",
            error_message: "Invalid oob code.",
            error_data: {
                error_code: "INVALID_OOB_CODE",
                element: "user_password",
            }
        }, 400);
    }
    else if (error.response?.data?.error?.message?.includes("EXPIRED_OOB_CODE") || error.code === "auth/expired-action-code") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "INVALID_OOB_CODE",
            error_message: "Expired oob code.",
            error_data: {
                error_code: "INVALID_OOB_CODE",
                element: "user_password",
            }
        }, 400);
    }
    else if (error.response?.data?.error?.message?.includes("WEAK_PASSWORD") || error.code === "auth/weak-password" || error.code === "auth/invalid-password") 
    {
        error = new User.Exceptions.UserBadRequestException({
            error_type: "WEAK_PASSWORD",
            error_message: "The password is too weak.",
            error_data: {
                error_code: "WEAK_PASSWORD",
                element: "user_password",
            }
        });
    }
    else if (error.response?.data?.error?.message?.includes("EMAIL_EXISTS") || error.code === "auth/email-already-exists" || error.code === "auth/email-already-in-use") 
    {
        error =  new User.Exceptions.UserBadRequestException({
            error_type: "EMAIL_IN_USE",
            error_message: "The email already exists.",
            error_data: {
                element: "user_email",
                error_code: "EMAIL_IN_USE",
            }
        });
    }
    else if (error.code === "auth/invalid-email") 
    {
        error =  new User.Exceptions.UserBadRequestException({
            error_type: "INVALID_EMAIL",
            error_message: "The email is invalid.",
            error_data: {
                element: "user_email",
                error_code: "INVALID_EMAIL",
            }
        });
    }
    else if (error.code === "auth/user-not-found") 
    {
        error =  new User.Exceptions.UserNotFoundException({
            error_type: "USER_NOT_FOUND",
            error_message: "The user was not found.",
            error_data: {
                element: "user_email",
                error_code: "USER_NOT_FOUND",
            }
        });
    }
    return error;
}

module.exports = ExceptionService;
