const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ReservationException : KaindaException,
    ReservationBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ReservationNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ReservationAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ReservationNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ReservationNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ReservationNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ReservationExceptionHandler: GenericKaindaExceptionHandler
};