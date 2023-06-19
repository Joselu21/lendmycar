const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Offer successfully (200)");

        it ("Create a Offer with invalid data (400)");

        it ("Create a Offer with invalid token (401)");

        it ("Create a Offer with no permission (403)");

        it ("Create a Offer with conflicting data (409)");
    });

};