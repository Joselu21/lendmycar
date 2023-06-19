const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Car successfully (200)");

        it ("Delete a Car with invalid token (401)");

        it ("Delete a Car with no permission (403)");

        it ("Delete a Car with invalid id (404)");
    });

};