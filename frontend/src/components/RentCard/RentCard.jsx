import "./RentCard.css";

import { Card, Image, Col, Button } from "react-bootstrap";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OfferService from "../../services/offer.service";
import CochePlaceholder from "../../assets/CochePlaceholder.png";

const RentCard = ({ offer, isEditable }) =>
{

    const navigate = useNavigate();

    const handleDelete = async () =>
    {
        try
        {
            await OfferService.deleteOffer(offer._id);
            window.location.reload();
        }
        catch (error)
        {
            console.log(error);
        }
    };

    return (
        <Col key={offer._id} className="">
            <Card className="rent-card">
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
                        {
                            !isEditable && offer?.distance_km &&
                            <p className="distance">
                                a {
                                    Math.floor(offer?.distance_km)
                                } km
                            </p>
                        }
                        {
                            !isEditable && offer?.offer_price &&
                            <p className="text-right m-3">
                                {offer?.offer_price.price_per_day}€/day
                            </p>
                        }
                        <Button variant="primary" onClick={() => navigate(`/search/rent/${offer._id}`)}>
                            {
                                isEditable ?
                                    "View"
                                    :
                                    "Rent"
                            }
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default RentCard;