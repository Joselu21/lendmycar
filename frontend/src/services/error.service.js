function HandleErrors(error, setter)
{
    console.log(error);

    if (error.error_message) {
        setter(error.error_message);
        return;
    }

    if (error.code === 'auth/user-not-found')
    {
        setter('User not found');
    }
    else if (error.code === 'auth/wrong-password')
    {
        setter('Wrong password');
    }
    else if (error.code === 'auth/email-already-in-use')
    {
        setter('Email already in use');
    }
    else if (error.code === 'auth/invalid-email')
    {
        setter('Invalid email');
    }
    else if (error.code === 'auth/weak-password')
    {
        setter('Weak password');
    }
}

export default HandleErrors;