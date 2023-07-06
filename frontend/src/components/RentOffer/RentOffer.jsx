import "./RentOffer.css";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import DatePicker from "react-datepicker";
import CochePlaceholder from "../../assets/CochePlaceholder.png";
import ReservationService from "../../services/reservation.service";
import { useNavigate } from "react-router-dom";

const RentOffer = ({ offer }) =>
{

    const [startDate, setStartDate] = useState((new Date()).setDate((new Date()).getDate() + 1));
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();

    function getDays()
    {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(startDate);
        const secondDate = new Date(endDate);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays;
    }

    async function handleRent()
    {
        try {
            await ReservationService.createReservation({
                reservation_dates : {
                    start_date : startDate,
                    end_date : endDate
                },
                offer : offer._id
            });
            navigate("/profile");
        } catch (error) {
            console.log(error);
            alert("Error renting offer");
        }
    }

    return (
        <Container className="rent-offer-container">
            <Row>
                <Col className="text-center my-3">
                    <h1>{offer?.offer_name}</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="text-center mt-3" xl={3} lg={4} md={4} sm={12} xs={12}>
                    {/* Image of the user */}
                    <img
                        src={offer?.user?.user_image?.image_url}
                        alt="user"
                        className="user-image"
                    />
                    {/* Name of the user */}
                    <p className="user-name">{offer?.user?.user_name}</p>
                    {/* Contact button */}
                    <Button
                        variant="primary"
                        className="contact-button"
                        href={`mailto:${offer?.user?.user_email}?subject=LendMyCar: I am interested in your offer ${offer?.offer_name}`}
                    >
                        Contact
                    </Button>
                </Col>
                <Col className="text-center mt-3" xl={9} lg={8} md={8} sm={12} xs={12}>
                    {/* Description of the offer */}
                    <Row>
                        <Col>
                            <p className="offer-description">
                                {offer?.offer_description}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center offer-location" xl={6} lg={6} md={6} sm={12} xs={12}>
                            {/* Location */}
                            <h5 className="">Pick up location</h5>
                            <MapContainer center={offer?.location?.coordinates} zoom={13} scrollWheelZoom={true} style={{ width: "100%", minHeight: "150px", height: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={offer?.location?.coordinates}>
                                    <Popup>
                                        <a href={`https://www.google.es/maps/dir/@${offer?.location?.coordinates[1]},${offer?.location?.coordinates[0]},15z`} target="_blank" rel="noreferrer">
                                            Give me directions
                                        </a>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Col>
                        <Col className="mt-3 d-flex align-items-center">
                            {/* Calendario */}
                            <Row className="w-100">
                                <Col className="text-center mb-3" xl={6} lg={12} md={12} sm={6} xs={6}>
                                    <h5 className="">Pick up date</h5>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat={"dd/MM/yyyy"}
                                        className="my-1"
                                    />
                                </Col>
                                <Col className="text-center mb-3" xl={6} lg={12} md={12} sm={6} xs={6}>
                                    <h5 className="">Return date</h5>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        dateFormat={"dd/MM/yyyy"}
                                        className="my-1 mx-2"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3" xl={3} lg={4} md={4} sm={12} xs={12}>
                    {/* Image of the vehicle */}
                    <img
                        src={offer?.car?.car_image?.image_url ?? CochePlaceholder}
                        alt="car"
                        className="car-image"
                    />
                </Col>
                <Col className="mt-3 d-flex align-items-center" xl={9} lg={8} md={8} sm={12} xs={12}>
                    {/* Description of the vehicle */}
                    <Row className="w-100">
                        <Col>
                            <h4 className="car-name mb-3">
                                {
                                    offer?.car?.car_name
                                }
                            </h4>
                            <p className="car-description">
                                {offer?.car?.car_description}
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center w-50 m-auto">
            <Col className="text-center mt-3" xl={10} lg={10} md={10} sm={12} xs={12}>
                    <h5 className="price">
                        {
                            offer?.offer_price
                        }
                        €/day
                        &nbsp;
                        x
                        &nbsp;
                        {
                            startDate && endDate ? getDays() : 0
                        }
                        &nbsp;
                        days
                        &nbsp;
                        =
                        &nbsp;
                        {
                            offer?.offer_price * (startDate && endDate ? getDays() : 0)
                        }
                        €
                    </h5>
                </Col>
                <Col className="text-center mt-3" xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Button 
                    variant="primary" 
                    className="rent-button"
                    onClick={handleRent}
                    >
                        Rent
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default RentOffer;