import React, { useState } from 'react';
import "./Menu.css";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaSearch, FaPlus, FaUserAlt } from "react-icons/fa";
import logo from "../../assets/logo.png";
import AuthPopup from "../AuthPopup/AuthPopup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase.service";
import useStateHandler from "../../hooks/useStateHandler";
import { useNavigate } from "react-router-dom";

const Menu = () =>
{
    const [modalShow, setModalShow] = useState(false);
    const [user] = useAuthState(auth);
    const { state } = useStateHandler();
    const navigate = useNavigate();

    function handleLogInClick()
    {
        if (!user)
        {
            setModalShow(true);
        }
        else
        {
            navigate("/profile");
        }
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="menu">
                <Navbar.Brand className="d-none d-md-flex" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="logo" />
                    <div className="logo-text">
                        <span className="logo-text-1">LendMyCar</span>
                    </div>
                </Navbar.Brand>
                <Nav className="nav-elements">
                    <Nav.Item className="search-container" onClick={() => navigate("/search")}>
                        <Button className="search-button">
                            <FaSearch />
                        </Button>
                    </Nav.Item>
                    <Nav.Item className="publish-container" onClick={() => navigate("/publish")}>
                        <Button className="publish-button">
                            <FaPlus />
                        </Button>
                    </Nav.Item>
                    <Nav.Item className="log-in-container">
                        <Button onClick={handleLogInClick} className="log-in-button">
                            {
                                state.user_session?.user_image ?
                                    <img src={state.user_session?.user_image?.image_url} alt="user" className="user-image" />
                                    :
                                    <FaUserAlt />
                            }
                        </Button>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <AuthPopup show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );

};

export default Menu;
