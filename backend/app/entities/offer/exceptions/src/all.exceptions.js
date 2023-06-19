const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    OfferException : KaindaException,
    OfferBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    OfferNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    OfferAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    OfferNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    OfferNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    OfferNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    OfferExceptionHandler: GenericKaindaExceptionHandler
};