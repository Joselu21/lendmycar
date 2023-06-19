import "./ListVehicles.css";
import { Card, Image, Col, Button, CloseButton, Row } from "react-bootstrap";
import NewVehicle from "../NewVehicle/NewVehicle";
import { useEffect, useState } from "react";
import CarService from "../../services/car.service";
import CochePlaceholder from "../../assets/CochePlaceholder.png";

const ListVehicles = ({ mode, selectedVehicle, setSelectedVehicle }) =>
{

    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() =>
    {
        CarService.getCars()
            .then(response =>
            {
                setVehicles(response);
            })
            .catch(error =>
            {
                console.log(error);
            });
    }, []);


    return (
        <>
            <Row>
                {
                    vehicles &&
                        vehicles.length > 0 ? vehicles.map(vehicle =>
                        {
                            return (
                                <Col key={vehicle._id} className="mt-3">
                                    <Card
                                        className={`vehicle-card ${selectedVehicle?._id === vehicle._id ? "selected" : ""}`}
                                        onClick={() =>
                                        {
                                            if (mode === "select")
                                            {
                                                setSelectedVehicle(vehicle);
                                            }
                                        }}
                                    >
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
                                            {/* Delete car button */}
                                            <CloseButton
                                                className="delete-button"
                                                onClick={async () =>
                                                {
                                                    await CarService.deleteCar(vehicle._id);
                                                    setVehicles(vehicles.filter(v => v._id !== vehicle._id));
                                                }}
                                            />
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>{vehicle.car_name}</Card.Title>
                                            <Card.Subtitle>{vehicle.car_description}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                        :
                        <p className="mt-3">
                            No vehicles found
                        </p>
                }
            </Row>
            <Button variant="primary" className="add-button mt-3" onClick={() => setShowModal(true)}>
                Add vehicle
            </Button>
            <NewVehicle
                show={showModal}
                onHide={() => setShowModal(false)}
                onCreate={newVehicle => setVehicles([...vehicles, newVehicle])}
            />
        </>
            );
};

            export default ListVehicles;;