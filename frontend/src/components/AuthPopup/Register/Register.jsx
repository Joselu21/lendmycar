import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { registerEmail } from '../../../services/firebase.service';
import useStateHandler from "../../../hooks/useStateHandler";
import HandleErrors from "../../../services/error.service";

const Register = ({ closeModal, setModalType }) =>
{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { stateHandler } = useStateHandler();

    const handleEmailChange = (event) =>
    {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) =>
    {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) =>
    {
        setConfirmPassword(event.target.value);
    };

    const handleRegister = async (event) =>
    {
        event.preventDefault();
        if (password !== confirmPassword)
        {
            setError("Passwords do not match");
            return;
        }
        
        try
        {
            setLoading(true);
            const user_session = await registerEmail(email, password);
            stateHandler.set("user_session", user_session);
            closeModal();
        }
        catch (error)
        {
            setLoading(false);
            HandleErrors(error, setError);
        }
    };

    return (
        <Form onSubmit={handleRegister}>
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

            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
            </Form.Group>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            <Button variant="primary" type="submit">
                {loading ? "Loading..." : "Create account"}
            </Button>
            <div className="separator mt-3">
                <hr />
                <span className="separator-text">or</span>
                <hr />
            </div>
            <GoogleLogin closeModal={closeModal} text="Create account with Google" />
            <div className="d-flex d-column justify-content-center mt-3 text-center align-items-center">
                <span className="separator-text">Already have an account?</span>
                <Button variant="link" onClick={() => setModalType("login")}>Log In</Button>
            </div>
        </Form>
    );
};

export default Register;