import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import HandleErrors from '../../../services/error.service';
import
{
    resetPassword,
} from '../../../services/firebase.service';

const ForgotPassword = ({ closeModal, setModalType }) =>
{
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        try
        {
            await resetPassword(email);
            setLoading(false);
            setSuccess(true);
            setEmail('');
            setError('');
        } catch (error)
        {
            setLoading(false);
            HandleErrors(error, setError);
        }
    };

    return (
        <Form onSubmit={handleForgotPassword}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                {loading ? 'Loading...' : 'Send email'}
            </Button>
            {error && (
                <Alert variant="danger" className="mt-3 p-2 text-center">
                    {error}
                </Alert>
            )}
            {success && (
                <Alert variant="success" className="mt-3 p-2 text-center">
                    Email sent successfully
                </Alert>
            )}
            <div className="d-flex">
                <Button variant="link" onClick={() => setModalType('login')}>
                    Back to login
                </Button>
            </div>
        </Form>
    );
};

export default ForgotPassword;