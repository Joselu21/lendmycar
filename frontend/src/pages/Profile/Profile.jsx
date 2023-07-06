import React, { useEffect, useState } from 'react';
import "./Profile.css";
import useStateHandler from "../../hooks/useStateHandler";
import { Container, Card, Accordion, Button, Modal } from "react-bootstrap";
import EditableImage from "../../components/EditableImage/EditableImage";
import { useParams } from "react-router-dom";
import ListVehicles from "../../components/ListVehicles/ListVehicles";
import { logout } from "../../services/firebase.service";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import { Col, Row } from 'react-bootstrap';
import OfferService from "../../services/offer.service";
import RentCard from "../../components/RentCard/RentCard";
import ShareCard from "../../components/ShareCard/ShareCard";
import UserPlaceholder from "../../assets/UsuarioPlaceholder.png";
import ReservationService from "../../services/reservation.service";

const Profile = () =>
{

    const { stateHandler, state } = useStateHandler();
    const { user_id } = useParams();
    const [user] = useState(state.user_session._id === user_id || !user_id ? state.user_session : null);
    const navigate = useNavigate();
    const [isProfileEditable] = useState(
        !user_id ||
        user_id === state.user_session?._id
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [name, setName] = useState(user?.user_name);

    const handleNameChange = async (event) =>
    {
        try
        {
            const newName = event.target.value;
            await UserService.updateProfile({
                user_name: newName
            });
            stateHandler.set("user_session", {
                ...state.user_session,
                user_name: newName
            });
            setName(newName);
        }
        catch (error)
        {
            console.log(error);
        }
    };

    const handleLogout = () =>
    {
        stateHandler.set("user_session", null);
        logout();
        navigate("/");
    };

    const handleDelete = () =>
    {
        stateHandler.set("user_session", null);
        UserService.deleteUser(user_id);
        logout();
        navigate("/");
    };

    // My offers
    const [myOffers, setMyOffers] = useState([]);
    // My reservations
    const [myReservations, setMyReservations] = useState([]);

    useEffect(() =>
    {
        const getMyOffers = async () =>
        {
            try
            {
                const response = await OfferService.getMyOffers(user_id);
                setMyOffers(response.data);
            }
            catch (error)
            {
                console.log(error);
            }
        };
        const getMyReservations = async () =>
        {
            try
            {
                const response = await ReservationService.getMyReservations(user_id);
                setMyReservations(response.data);
            }
            catch (error)
            {
                console.log(error);
            }
        };
        getMyOffers();
        getMyReservations();
    }, [user_id]);


    return (
        <Container>
            <Card className="profile-card mt-2">
                <EditableImage
                    src={user?.user_image?.image_url ?? UserPlaceholder}
                    alt={user?.user_name}
                    isEditable={isProfileEditable}
                    className="profile-image"
                    mode="profile"
                />
                <Card.Body className="text-center">
                    <Card.Title>
                        {
                            isProfileEditable ?
                                <input
                                    className="text-center"
                                    type="text"
                                    defaultValue={name}
                                    onBlur={handleNameChange}
                                />
                                :
                                user?.user_name
                        }
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user?.user_email}</Card.Subtitle>
                </Card.Body>
            </Card>
            <Accordion className="mb-5">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="space-around text-center">
                        <h5 className="w-100 text-center m-0">
                            My vehicles
                        </h5>
                    </Accordion.Header>
                    <Accordion.Body className="text-center">
                        <ListVehicles
                            mode="profile"
                            isProfileEditable={isProfileEditable}
                            user_id={user_id}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className="mb-5">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="space-around text-center">
                        <h5 className="w-100 text-center m-0">
                            My offers published
                        </h5>
                    </Accordion.Header>
                    <Accordion.Body className="text-center">
                        <Row>
                            {
                                myOffers && myOffers.length === 0 &&

                                <Col className="mt-3">
                                    <p className="text-center">
                                        You don't have any published offers yet
                                    </p>
                                    <Button className="mt-3" variant="outline-primary" onClick={() => navigate("/publish")}>
                                        Publish an offer
                                    </Button>
                                </Col>
                            }
                            {
                                myOffers && myOffers.length > 0 &&
                                myOffers.map((offer, index) =>
                                {
                                    if (offer.__t === "Share")
                                    {
                                        return (
                                            <Col key={index} className="mt-3">
                                                <ShareCard
                                                    offer={offer}
                                                    isEditable={isProfileEditable}
                                                />
                                            </Col>
                                        );
                                    }
                                    else 
                                    {
                                        return (
                                            <Col key={index} className="mt-3">
                                                <RentCard
                                                    offer={offer}
                                                    isEditable={isProfileEditable}
                                                />
                                            </Col>
                                        );
                                    }
                                })
                            }
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className="mb-5">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="space-around text-center">
                        <h5 className="w-100 text-center m-0">
                            My reservations
                        </h5>
                    </Accordion.Header>
                    <Accordion.Body className="text-center">
                            <Row>
                                {
                                    myReservations && myReservations.length === 0 &&
                                    <Col className="mt-3">
                                        <p className="text-center">
                                            You don't have any reservations yet
                                        </p>
                                        <Button className="mt-3" variant="outline-primary" onClick={() => navigate("/search")}>
                                            Search for an offer
                                        </Button>
                                    </Col>
                                }
                                {
                                    myReservations && myReservations.length > 0 &&
                                    myReservations.map((reservation, index) =>
                                    {
                                        console.log(reservation);
                                        if (reservation.offer.__t === "Share")
                                        {
                                            return (
                                                <Col key={index} className="mt-3">
                                                    <ShareCard
                                                        offer={reservation.offer}
                                                        isEditable={isProfileEditable}
                                                        reservation={reservation}
                                                    />
                                                </Col>
                                            );
                                        }
                                        else
                                        {
                                            return (
                                                <Col key={index} className="mt-3">
                                                    <RentCard
                                                        offer={reservation.offer}
                                                        isEditable={isProfileEditable}
                                                        reservation={reservation}
                                                    />
                                                </Col>
                                            );
                                        }
                                    })
                                }
                            </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {
                isProfileEditable &&
                <Accordion className="mb-5">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="space-around text-center">
                            <h5 className="w-100 text-center m-0">
                                Profile options
                            </h5>
                        </Accordion.Header>
                        <Accordion.Body className="text-center">
                            <Button onClick={handleLogout} variant="outline-warning" className="me-2">
                                Logout
                            </Button>
                            <Button
                                onClick={() => setShowDeleteModal(true)}
                                variant="outline-danger"
                                className="ms-2"
                            >
                                Delete account
                            </Button>
                            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>
                                        This action cannot be undone.
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            }
        </Container>
    );
};

export default Profile;