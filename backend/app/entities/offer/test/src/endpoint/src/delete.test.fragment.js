const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Offer successfully (200)");

        it ("Delete a Offer with invalid token (401)");

        it ("Delete a Offer with no permission (403)");

        it ("Delete a Offer with invalid id (404)");
    });

};