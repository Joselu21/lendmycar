const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Reservation successfully (200)");

        it ("Delete a Reservation with invalid token (401)");

        it ("Delete a Reservation with no permission (403)");

        it ("Delete a Reservation with invalid id (404)");
    });

};