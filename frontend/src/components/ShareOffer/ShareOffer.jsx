import "./ShareOffer.css";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import CochePlaceholder from "../../assets/CochePlaceholder.png";
import ReservationService from "../../services/reservation.service";
import { useNavigate } from "react-router-dom";

const ShareOffer = ({ offer }) =>
{

    const [seats, setSeats] = useState(1);
    const navigate = useNavigate();

    async function handleShare()
    {
        const reservation = {
            reservation_seats: seats,
            offer: offer._id
        };

        const { response } = await ReservationService.createReservation(reservation);
        console.log(response);
        if (response.status === 201)
        {
            navigate("/profile");
        }
        else
        {
            alert("Error sharing offer");
        }
    }

    return (
        <Container className="share-offer-container">
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
                            {/* Date */}
                            <h5 className="">Date</h5>
                            {
                                offer?.offer_start_date ? new Date(offer?.offer_start_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                                    + " a las " + new Date(offer?.offer_start_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                                    :
                                    "No date"
                            }
                        </Col>
                        <Col className="text-center offer-location" xl={6} lg={6} md={6} sm={12} xs={12}>
                            {/* Seats */}
                            <h5 className="">Seats</h5>
                            <input
                                type="number"
                                className="seats-input"
                                value={seats}
                                onChange={(e) => setSeats(e.target.value)}
                                min={1}
                                max={offer?.offer_seats}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center offer-location" xl={12}>
                            {/* Location */}
                            <h5 className="">Travel</h5>
                            {
                                offer?.offer_start_location?.coordinates[1] &&
                                <MapContainer center={
                                    [
                                        offer?.offer_start_location?.coordinates[0] + (offer?.offer_end_location?.coordinates[0] - offer?.offer_start_location?.coordinates[0]) / 2,
                                        offer?.offer_start_location?.coordinates[1] + (offer?.offer_end_location?.coordinates[1] - offer?.offer_start_location?.coordinates[1]) / 2
                                    ]
                                } zoom={
                                    offer?.offer_start_location?.coordinates[0] === offer?.offer_end_location?.coordinates[0] &&
                                        offer?.offer_start_location?.coordinates[1] === offer?.offer_end_location?.coordinates[1] ?
                                        15 :
                                        6
                                } scrollWheelZoom={true} style={{ width: "100%", minHeight: "150px", height: "100%" }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={offer?.offer_start_location?.coordinates}>
                                        <Popup>
                                            <a href={`https://www.google.es/maps/dir/@${offer?.offer_start_location?.coordinates[0]},${offer?.offer_start_location?.coordinates[1]},15z`} target="_blank" rel="noreferrer">
                                                Give me directions
                                            </a>
                                        </Popup>
                                    </Marker>
                                    <Marker position={offer?.offer_end_location?.coordinates}>
                                        <Popup>
                                            <a href={`https://www.google.es/maps/dir/${offer?.offer_start_location?.coordinates[0]},${offer?.offer_start_location?.coordinates[1]}/${offer?.offer_end_location?.coordinates[0]},${offer?.offer_end_location?.coordinates[1]}`} target="_blank" rel="noreferrer">
                                                Give me directions
                                            </a>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            }
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
                        €/seat
                        &nbsp;
                        x
                        &nbsp;
                        {
                            seats
                        }
                        &nbsp;
                        seats
                        &nbsp;
                        =
                        &nbsp;
                        {
                            offer?.offer_price * seats
                        }
                        €
                    </h5>
                </Col>
                <Col className="text-center mt-3" xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Button
                        variant="primary"
                        className="share-button"
                        onClick={handleShare}
                    >
                        Share
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ShareOffer;