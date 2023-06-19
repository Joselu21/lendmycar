const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Reservation successfully (200)");

        it ("Create a Reservation with invalid data (400)");

        it ("Create a Reservation with invalid token (401)");

        it ("Create a Reservation with no permission (403)");

        it ("Create a Reservation with conflicting data (409)");
    });

};