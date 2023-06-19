import React from "react";
import { Button } from "react-bootstrap";
import { MdAddLocationAlt } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import SelectLocation from "../../SelectLocation/SelectLocation";
import DatePicker from "react-datepicker";

const ShareParams = ({ maxDistance, setMaxDistance, location, setLocation, date, setDate }) =>
{

    const [show, setShow] = React.useState(false);

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
        <h5>Destination</h5>
        <input type="text" className="form-control my-1" placeholder={
            location[0] === 0 && location[1] === 0 ?
                "Where are you going?" :
                location
        } onChange={(e) => setLocation(e.target.value)} />
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
        <h5>Max distance</h5>
        <input
            type="number"
            className="form-control my-1"
            placeholder={maxDistance ? maxDistance + " km" : "No limit"}
            onChange={(e) => setMaxDistance(e.target.value)}
        />
        <h5 className="mt-3">
            Date
        </h5>
        <DatePicker
            selected={date}
            onChange={(a) => setDate(a)}
            selectsStart
            startDate={new Date()}
            dateFormat={"dd/MM/yyyy"}
            className="my-1"
        />
    </>
    );

};

export default ShareParams;