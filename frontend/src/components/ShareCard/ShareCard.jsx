import "./ShareCard.css";
import { Card, Image, Col, Button } from "react-bootstrap";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OfferService from "../../services/offer.service";
import CochePlaceholder from "../../assets/CochePlaceholder.png";
import ReservationService from "../../services/reservation.service";

const ShareCard = ({ offer, isEditable, reservation }) =>
{

    const navigate = useNavigate();

    const handleDelete = async () =>
    {
        try
        {
            if(!reservation)
                await OfferService.deleteOffer(offer._id);
            else
                await ReservationService.deleteReservation(reservation._id);
            window.location.reload();
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (
        <Col key={offer._id} className="">
            <Card className="share-card">
                <Card.Header>
                    {
                        offer?.car?.car_image?.image_url ?
                            <Image
                                src={offer.car.car_image.image_url}
                                className="car-image"
                            />
                            :
                            <Image
                                src={CochePlaceholder}
                                className="car-image"
                            />
                    }
                </Card.Header>
                <Card.Body>
                    {
                        isEditable &&
                        <CloseButton
                            className="close-button"
                            onClick={handleDelete}
                        />
                    }
                    <Card.Title className="text-left">
                        {offer?.offer_name}
                    </Card.Title>
                    <Card.Text className="text-muted">
                        {offer?.offer_description}
                    </Card.Text>
                    <div className="d-flex flex-direction-row w-100 price-div p-0">
                        <span className="distance">
                        {
                            !isEditable && offer?.distance_start_km &&
                                Math.floor(offer?.distance_start_km) + " km from origin"
                        }
                        {
                            !isEditable && offer?.distance_start_km && offer?.distance_end_km &&
                                " and "
                        }
                        {
                            !isEditable && offer?.distance_end_km &&
                                Math.floor(offer?.distance_end_km) + " km from destination"
                        }
                        </span>
                        {
                            !isEditable && offer?.offer_price &&
                            <p className="text-right m-3">
                                {offer?.offer_price}€/seat
                            </p>
                        }
                        <Button variant="primary" onClick={() => navigate(`/search/share/${offer._id}`)}>
                            {
                                isEditable ?
                                    "View"
                                    :
                                    "Share"
                            }
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ShareCard;