const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Car successfully (200)");

        it ("Create a Car with invalid data (400)");

        it ("Create a Car with invalid token (401)");

        it ("Create a Car with no permission (403)");

        it ("Create a Car with conflicting data (409)");
    });

};