const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Car successfully (200)");

        it ("Update a Car with invalid data (400)");

        it ("Update a Car with invalid token (401)");

        it ("Update a Car with no permission (403)");

        it ("Update a Car with invalid id (404)");
    });

};