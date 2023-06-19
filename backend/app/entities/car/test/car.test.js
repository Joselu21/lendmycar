const EndpointTests = require("./src/endpoint");
const UnitTests = require("./src/unit");

describe("Car", function () 
{

    for (let test in UnitTests) 
    {
        UnitTests[test]();
    }

    for (let test in EndpointTests) 
    {
        EndpointTests[test]();
    }

});