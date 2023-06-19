import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import Login from "./Login/Login";
import Register from "./Register/Register";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import "./AuthPopup.css";


const AuthPopup = ({ show, onHide }) =>
{

    const [modalType, setModalType] = useState("login");

    function closeModal()
    {
        onHide();
        setModalType("login");
    }

    return (
        <Modal show={show} onHide={closeModal} centered className="auth-popup">
            <Modal.Header closeButton>
                <Modal.Title>
                    {modalType === "login" && "Login"}
                    {modalType === "register" && "Register"}
                    {modalType === "forgotPassword" && "Forgot Password"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalType === "login" && <Login closeModal={closeModal} setModalType={setModalType} />}
                {modalType === "register" && <Register closeModal={closeModal} setModalType={setModalType} />}
                {modalType === "forgotPassword" && <ForgotPassword closeModal={closeModal} setModalType={setModalType} />}
            </Modal.Body>
        </Modal>
    );
};

export default AuthPopup;