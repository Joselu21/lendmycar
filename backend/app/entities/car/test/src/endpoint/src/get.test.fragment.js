const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Cars", function () 
        {

            it("Get all Cars successfully (200) with data");

            it("Get all Cars successfully (200) without data");

            it("Get all Cars with invalid token (401)");

            it("Get all Cars with no permission (403)");

        });

        describe("Get Car by id", function () 
        {

            it("Get a Car successfully (200)");

            it("Get a Car with invalid token (401)");

            it("Get a Car with no permission (403)");

            it("Get a Car with invalid id (404)");

        });

    });

};