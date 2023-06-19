const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Offer successfully (200)");

        it ("Update a Offer with invalid data (400)");

        it ("Update a Offer with invalid token (401)");

        it ("Update a Offer with no permission (403)");

        it ("Update a Offer with invalid id (404)");
    });

};