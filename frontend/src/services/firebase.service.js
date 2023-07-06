// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import axios from "axios";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithCustomToken,
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    signOut,
} from "firebase/auth";

import firebaseConfig from "../config/firebase.config";
import apiConfig from "../config/api.config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function requestCustomTokenAndLogin(user, url) {
    const response = await axios.post(url, user);
    const { custom_token } = response.data;
    await signInWithCustomToken(auth, custom_token);
    return response.data.user_session;
}

async function registerOrLoginGoogle() {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("email");
    const user = await signInWithPopup(auth, googleProvider);
    console.log(user);
    return await requestCustomTokenAndLogin({
        user_email: user.user.email ?? user.user.providerData[0].email,
        user_name: user.user.displayName ?? "Usuario",
        user_id : user.user.uid,
        token : user._tokenResponse.idToken,
    }, apiConfig.endpoints.loginGoogle);
};

async function registerEmail(email, password, name) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return await requestCustomTokenAndLogin({
        user_email: user.user.email,
        user_name: name ?? user.user.displayName ?? "Usuario",
        user_id : user.user.uid,
    }, apiConfig.endpoints.register);
};

async function loginEmail(email, password) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return await requestCustomTokenAndLogin({
        user_email: response.user.email,
        user_id : response.user.uid,
    }, apiConfig.endpoints.login);
};

async function logout() {
    await signOut(auth);
};

async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
};

export {
    app,
    auth,
    registerOrLoginGoogle,
    registerEmail,
    resetPassword,
    loginEmail,
    logout,
};
