import React from "react";
import { Button } from "react-bootstrap";
import { MdAddLocationAlt } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import SelectLocation from "../../SelectLocation/SelectLocation";
import DatePicker from "react-datepicker";

const ShareParams = ({ maxDistance, setMaxDistance, origin, setOrigin, destination, setDestination, date, setDate }) =>
{

    const [showOrigin, setShowOrigin] = React.useState(false);
    const [showDestination, setShowDestination] = React.useState(false);

    return (<>
        <div className="d-flex flex-row align-items-center justify-content-center my-3">
            <IoFilter />
            <h4 className="mb-1 mx-2">
                Filters
            </h4>
        </div>
        <h5>Origin</h5>
        <input type="text" className="form-control my-1" placeholder={
            origin[0] === 0 && origin[1] === 0 ?
                "Where are you?" :
                origin
        } onChange={(e) => setOrigin(e.target.value)} />
        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
            <MdAddLocationAlt className="text-primary" />
            <Button
                variant="outline"
                className="use-current-location"
                onClick={(e) => setShowOrigin(true)}
            >
                Select origin
            </Button>
            <SelectLocation
                show={showOrigin}
                onHide={() => setShowOrigin(false)}
                location={origin}
                setLocation={setOrigin}
            ></SelectLocation>
        </div>
        <h5>Destination</h5>
        <input type="text" className="form-control my-1" placeholder={
            destination[0] === 0 && destination[1] === 0 ?
                "Where are you going?" :
                destination
        } onChange={(e) => setDestination(e.target.value)} />
        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
            <MdAddLocationAlt className="text-primary" />
            <Button
                variant="outline"
                className="use-current-location"
                onClick={(e) => setShowDestination(true)}
            >
                Select destination
            </Button>
            <SelectLocation
                show={showDestination}
                onHide={() => setShowDestination(false)}
                location={destination}
                setLocation={setDestination}
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