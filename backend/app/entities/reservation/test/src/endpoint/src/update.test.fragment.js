const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Reservation successfully (200)");

        it ("Update a Reservation with invalid data (400)");

        it ("Update a Reservation with invalid token (401)");

        it ("Update a Reservation with no permission (403)");

        it ("Update a Reservation with invalid id (404)");
    });

};