import React from 'react';
import "./GoogleLogin.css";
import { registerOrLoginGoogle } from "../../../services/firebase.service";
import useStateHandler from "../../../hooks/useStateHandler";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({ closeModal, text }) =>
{

    const { stateHandler } = useStateHandler();

    const handleGoogleLogin = async() =>
    {
        const user_session = await registerOrLoginGoogle();
        stateHandler.set("user_session", user_session);
        closeModal();
    };

    return (
        <button className="google-login-button" onClick={handleGoogleLogin}>
            <FcGoogle/>
            <span>
                {text}
            </span>
        </button>
    );
};

export default GoogleLogin;
