import React from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import EditableImage from "../EditableImage/EditableImage";
import CarService from "../../services/car.service";
import HandleErrors from "../../services/error.service";
import CochePlaceholder from "../../assets/CochePlaceholder.png";

const NewVehicle = ({ show, onHide, onCreate }) =>
{

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState(null);

    function closeModal()
    {
        onHide();
    }

    async function handleNewCar(e)
    {
        e.preventDefault();
        try
        {
            console.log(image);
            const data = {
                car_name: name,
                car_description: description,
                car_image: image
            };
            const { data: car } = await CarService.createCar(data);
            console.log(car);
            onCreate(car);
            closeModal();
        }
        catch (error)
        {
            HandleErrors(error);
        }
    }

    return (
        <Modal show={show} onHide={closeModal} centered className="auth-popup">
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new vehicle
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="carName" className="mt-3">
                        <Form.Label>Vehicle name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter vehicle name"
                            onChange={e => setName(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="carDescription" className="mt-3">
                        <Form.Label>Vehicle description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter vehicle description"
                            onChange={e => setDescription(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="carImage" className="mt-3">
                        <Form.Label>Vehicle image</Form.Label>
                        <EditableImage
                            src={CochePlaceholder}
                            alt="Vehicle image"
                            className="profile-image my-4"
                            mode="car"
                            isEditable={true}
                            onCarUpload={img => setImage(img)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleNewCar}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewVehicle;