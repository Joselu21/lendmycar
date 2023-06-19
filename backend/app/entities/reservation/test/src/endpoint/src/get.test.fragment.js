const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Reservations", function () 
        {

            it("Get all Reservations successfully (200) with data");

            it("Get all Reservations successfully (200) without data");

            it("Get all Reservations with invalid token (401)");

            it("Get all Reservations with no permission (403)");

        });

        describe("Get Reservation by id", function () 
        {

            it("Get a Reservation successfully (200)");

            it("Get a Reservation with invalid token (401)");

            it("Get a Reservation with no permission (403)");

            it("Get a Reservation with invalid id (404)");

        });

    });

};