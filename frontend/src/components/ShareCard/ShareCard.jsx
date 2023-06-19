import "./ShareCard.css";

import { Card, Image, Col, Button } from "react-bootstrap";
import CochePlaceholder from "../../assets/CochePlaceholder.png";

const ShareCard = ({ vehicle }) =>
{
    return (
        <Col key={vehicle._id} className="mt-3">
            <Card>
                <Card.Header>
                    {
                        vehicle?.car_image?.image_url ?
                            <Image
                                src={vehicle.car_image.image_url}
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
                    <Card.Title>{vehicle?.car_name}</Card.Title>
                    <Card.Text>
                        {vehicle?.car_description}
                    </Card.Text>
                    <Card.Text>
                        {vehicle?.car_price}
                    </Card.Text>
                    <Button variant="primary">Share</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ShareCard;