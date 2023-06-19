const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Offers", function () 
        {

            it("Get all Offers successfully (200) with data");

            it("Get all Offers successfully (200) without data");

            it("Get all Offers with invalid token (401)");

            it("Get all Offers with no permission (403)");

        });

        describe("Get Offer by id", function () 
        {

            it("Get a Offer successfully (200)");

            it("Get a Offer with invalid token (401)");

            it("Get a Offer with no permission (403)");

            it("Get a Offer with invalid id (404)");

        });

    });

};