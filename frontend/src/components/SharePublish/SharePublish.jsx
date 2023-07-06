import React, { useState } from "react";
import "./SharePublish.css";
import { Container, Row, Col, Form, Button, Accordion } from "react-bootstrap";
import ListVehicles from "../ListVehicles/ListVehicles";
import OfferService from "../../services/offer.service";
import { useNavigate } from "react-router-dom";
import SelectLocation from "../SelectLocation/SelectLocation";
import { BiCurrentLocation } from "react-icons/bi";
import { MdAddLocationAlt } from "react-icons/md";

const SharePublish = () =>
{

    const navigate = useNavigate();
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [activeKey, setActiveKey] = useState("0");
    const [offerName, setOfferName] = useState("");
    const [offerDescription, setOfferDescription] = useState("");
    const [offerPrice, setOfferPrice] = useState(0);
    const [offerSeats, setOfferSeats] = useState(0);
    const [offerDateTime, setOfferDateTime] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [location1, setLocation1] = useState([0, 0]);
    const [location2, setLocation2] = useState([0, 0]);

    // Form validation
    const [validated1, setValidated1] = useState(null);
    const [validated2, setValidated2] = useState(null);
    const [validated3, setValidated3] = useState(null);

    const [ok1, setOk1] = useState(false);
    const [ok2, setOk2] = useState(false);
    const [ok3, setOk3] = useState(false);


    const handlePublishShare = () =>
    {
        OfferService.createOffer({
            __t: "Share",
            offer_name: offerName,
            offer_description: offerDescription,
            offer_price: offerPrice,
            offer_seats: offerSeats,
            offer_start_date: offerDateTime,
            offer_start_location: {
                type: "Point",
                coordinates: location1
            },
            offer_end_location: {
                type: "Point",
                coordinates: location2
            },
            car: selectedVehicle?._id
        })
            .then(response =>
            {
                console.log(response);
                if (response.response.ok)
                {
                    console.log("Offer created successfully", response.data);
                    navigate("/profile");
                }
            })
            .catch(error =>
            {
                console.log(error);
            });
    };

    function handleCurrentLocation()
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            setLocation1([position.coords.latitude, position.coords.longitude]);
        });
    };

    return (
        <>
            <h3 className="w-100 text-center h3-title">
                Publish a share offer
            </h3>
            <Accordion
                defaultActiveKey="0"
                className="publish-accordion"
                activeKey={activeKey}
                onSelect={(eventKey) =>
                {
                    if ((eventKey === "1" && !ok1) || (eventKey === "2" && !ok2) || (eventKey === "3" && !ok3))
                    {
                        return;
                    }
                    setActiveKey(eventKey);
                }}
            >
                {/* Nombre, descripcion */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="text-center">
                        Offer Details
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Form noValidate validated={validated1} onSubmit={(e) =>
                            {
                                e.preventDefault();
                                const form = e.currentTarget;
                                if (form.checkValidity() === false)
                                {
                                    e.stopPropagation();
                                }
                                else
                                {
                                    setOk1(true);
                                    setActiveKey("1");
                                }
                                setValidated1(true);
                            }}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Offer name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter offer name" required
                                                onChange={(e) => setOfferName(e.target.value)}
                                            />
                                            < Form.Control.Feedback type="invalid">
                                                Please enter a name for the offer.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicDescription">
                                            <Form.Label>Offer description</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Enter offer description" required
                                                onChange={(e) => setOfferDescription(e.target.value)}
                                            />
                                            < Form.Control.Feedback type="invalid">
                                                Please enter a description for the offer.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPrice">
                                            <Form.Label>Price per seat</Form.Label>
                                            <Form.Control type="number" placeholder="Enter price per seat in euros" required
                                                onChange={(e) => setOfferPrice(e.target.value)}
                                            />
                                            < Form.Control.Feedback type="invalid">
                                                The price must be numerical and greater than 0.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicNumberSeats">
                                            <Form.Label>Number of seats</Form.Label>
                                            <Form.Control type="number" placeholder="Enter number of seats" required
                                                onChange={(e) => setOfferSeats(e.target.value)}
                                            />
                                            < Form.Control.Feedback type="invalid">
                                                The number of seats must be numerical and greater than 0.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicDate">
                                            <Form.Label>Departure date</Form.Label>
                                            <Form.Control type="datetime-local" placeholder="Enter departure date" required
                                                onChange={(e) => setOfferDateTime(e.target.value)}
                                            />
                                            < Form.Control.Feedback type="invalid">
                                                Please enter a departure date.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Button variant="primary" type="submit">
                                            Next
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                {/* Select the car */}
                <Accordion.Item eventKey="1">
                    <Accordion.Header className="text-center">
                        Select the car
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Form className="mb-3" noValidate validated={validated2} onSubmit={(e) =>
                            {
                                e.preventDefault();
                                const form = e.currentTarget;
                                if (form.checkValidity() === false || !selectedVehicle)
                                {
                                    setValidated2(true);
                                    e.stopPropagation();
                                }
                                else
                                {
                                    setOk2(true);
                                    setActiveKey("2");
                                }
                            }}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicVehicle">
                                            <Form.Label>Select a vehicle</Form.Label>
                                            <Form.Control type="text" placeholder="Waiting for vehicle selection" required disabled
                                                value={
                                                    selectedVehicle ? selectedVehicle.car_name : ""
                                                }
                                                onChange={() =>
                                                {
                                                    setValidated2(false);
                                                }}
                                            />
                                            < Form.Control.Feedback type="invalid" style={{ display: validated2 ? 'block' : 'none' }}>
                                                Please select a vehicle.
                                            </Form.Control.Feedback>
                                            <ListVehicles
                                                mode="select"
                                                selectedVehicle={selectedVehicle}
                                                setSelectedVehicle={(vehicle) =>
                                                {
                                                    setSelectedVehicle(vehicle);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center mt-3">
                                        <Button variant="primary" type="submit">
                                            Next
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                {/* Select the location */}
                <Accordion.Item eventKey="2">
                    <Accordion.Header className="text-center">
                        Select the location
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Form className="mb-3" noValidate validated={validated3} onSubmit={(e) =>
                            {
                                e.preventDefault();
                                const form = e.currentTarget;
                                if (form.checkValidity() === false)
                                {
                                    e.stopPropagation();
                                }
                                else
                                {
                                    setOk3(true);
                                    handlePublishShare();
                                }
                                setValidated3(true);
                            }}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicLocation">
                                            <Form.Label>Select a starting point location</Form.Label>
                                            <Form.Control type="text" placeholder="Waiting for location selection" required disabled
                                                value={
                                                    location1[0] !== 0 && location1[1] !== 0
                                                        ?
                                                        location1[0] + ", " + location1[1]
                                                        :
                                                        ""
                                                }
                                                onChange={() =>
                                                {
                                                    console.log("change");
                                                    setValidated3(false);
                                                }}
                                            />
                                            < Form.Control.Feedback type="invalid" style={{ display: location1[0] === 0 ? 'block' : 'none' }}>
                                                Please, select a location.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {/* Use my current location button */}
                                        <div className="d-flex flex-row align-items-center justify-content-center mb-2">
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
                                                onClick={() =>
                                                {
                                                    setShow1(true);
                                                }}
                                            >
                                                Select location
                                            </Button>
                                            <SelectLocation
                                                show={show1}
                                                onHide={() => setShow1(false)}
                                                location={location1}
                                                setLocation={setLocation1}
                                            ></SelectLocation>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicLocation">
                                            <Form.Label>Select an ending point location</Form.Label>
                                            <Form.Control type="text" placeholder="Waiting for location selection" required disabled
                                                value={
                                                    location2[0] !== 0 && location2[1] !== 0
                                                        ?
                                                        location2[0] + ", " + location2[1]
                                                        :
                                                        ""
                                                }
                                                onChange={() =>
                                                {
                                                    console.log("change");
                                                    setValidated3(false);
                                                }}
                                            />
                                            < Form.Control.Feedback type="invalid" style={{ display: location2[0] === 0 ? 'block' : 'none' }}>
                                                Please, select a location.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        {/* Use my current location button */}
                                        <div className="d-flex flex-row align-items-center justify-content-center mb-2">
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
                                                onClick={() =>
                                                {
                                                    setShow2(true);
                                                }}
                                            >
                                                Select location
                                            </Button>
                                            <SelectLocation
                                                show={show2}
                                                onHide={() => setShow2(false)}
                                                location={location2}
                                                setLocation={setLocation2}
                                            ></SelectLocation>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center mt-3">
                                        <Button variant="primary" type="submit">
                                            Publish
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default SharePublish;