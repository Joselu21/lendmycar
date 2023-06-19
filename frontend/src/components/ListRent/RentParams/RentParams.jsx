import React from "react";
import { Button } from "react-bootstrap";
import { BiCurrentLocation } from "react-icons/bi";
import { MdAddLocationAlt } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import SelectLocation from "../../SelectLocation/SelectLocation";

const RentParams = ({ maxDistance, setMaxDistance, location, setLocation }) =>
{

    const [show, setShow] = React.useState(false);

    function handleCurrentLocation()
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            setLocation([position.coords.latitude, position.coords.longitude]);
        });
    };

    function handleSelectLocation()
    {
        setShow(true);
    };

    return (<>
        <div className="d-flex flex-row align-items-center justify-content-center my-3">
            <IoFilter />
            <h4 className="mb-1 mx-2">
                Filters
            </h4>
        </div>
        <h5>Location</h5>
        <input type="text" className="form-control my-1" placeholder={
            location[0] === 0 && location[1] === 0 ?
                "Near me" :
                location
        } onChange={(e) => setLocation(e.target.value)} />
        {/* Use my current location button */}
        <div className="d-flex flex-row align-items-center justify-content-center">
            <BiCurrentLocation className="text-primary" />
            <Button
                variant="outline"
                className="use-current-location"
                onClick={handleCurrentLocation}
            >
                Current location
            </Button>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
            <MdAddLocationAlt className="text-primary" />
            <Button
                variant="outline"
                className="use-current-location"
                onClick={handleSelectLocation}
            >
                Select location
            </Button>
            <SelectLocation
                show={show}
                onHide={() => setShow(false)}
                location={location}
                setLocation={setLocation}
            ></SelectLocation>
        </div>
        <h5>Maximum distance</h5>
        <input 
        type="number" 
        className="form-control my-1" 
        placeholder={maxDistance ? maxDistance + " km" : "No limit"}
        onChange={(e) => setMaxDistance(e.target.value)}
        />
    </>
    );

};

export default RentParams;