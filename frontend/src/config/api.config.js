const apiConfig = {
    protocol: 'http',
    host: 'localhost',
    port: 3001,
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
    }
};

apiConfig.url = `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}`;

for (const endpoint in apiConfig.endpoints) {
    apiConfig.endpoints[endpoint] = `${apiConfig.url}/${apiConfig.endpoints[endpoint]}`;
}

export default apiConfig;