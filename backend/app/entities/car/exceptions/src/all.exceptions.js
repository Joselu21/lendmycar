const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    CarException : KaindaException,
    CarBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    CarNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    CarAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    CarNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    CarNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    CarNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    CarExceptionHandler: GenericKaindaExceptionHandler
};