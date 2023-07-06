const apiConfig = {
    protocol: process.env.NODE_ENV === 'production' ? 'https' : 'https',
    host: process.env.NODE_ENV === 'production' ? 'tfg.jlsg.es' : 'joselu.suarte.art',
    port: process.env.NODE_ENV === 'production' ? 443 : 443,
    endpoints: {
        "loginGoogle": "login/google",
        "login": "login",
        "register": "register",
        "updateProfile": "user/me",
        "uploadImage": "image/upload",
        "deleteUser": "user",
        "getCars": "car/me",
        "createCar": "car",
        "deleteCar": "car",
        "search": "search",
        "getOfferById": "offer",
        "getMyOffers": "offer/me",
        "createOffer": "offer",
        "deleteOffer": "offer",
        "getMyReservations": "reservation/me",
        "createReservation": "reservation",
        "deleteReservation": "reservation"
    }
};

apiConfig.url = `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}`;

for (const endpoint in apiConfig.endpoints) {
    apiConfig.endpoints[endpoint] = `${apiConfig.url}/${apiConfig.endpoints[endpoint]}`;
}

export default apiConfig;