import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import
{
    loginEmail,
} from "../../../services/firebase.service";
import useStateHandler from "../../../hooks/useStateHandler";


const Login = ({ closeModal, setModalType }) =>
{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { stateHandler } = useStateHandler();

    const handleEmailChange = (event) =>
    {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) =>
    {
        setPassword(event.target.value);
    };

    const handleEmailLogin = async (event) =>
    {
        event.preventDefault();
        const user_session = await loginEmail(email, password);
        stateHandler.set("user_session", user_session);
        closeModal();
    };

    return (<>
        <Form onSubmit={handleEmailLogin}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </Form.Group>
            <div className="d-flex">
                <Button variant="link" onClick={() => setModalType("forgotPassword")}>Forgot password?</Button>
            </div>
            <Button variant="primary" type="submit">Login</Button>
            <div className="separator mt-3">
                <hr />
                <span className="separator-text">or</span>
                <hr />
            </div>
            <GoogleLogin closeModal={closeModal} text="Log In with Google" />
            <div className="d-flex d-column justify-content-center mt-3 text-center align-items-center">
                <span className="separator-text">Don't have an account?</span>
                <Button variant="link" onClick={() => setModalType("register")}>Register</Button>
            </div>
        </Form>
    </>);
};

export default Login;