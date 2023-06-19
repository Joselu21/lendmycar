import apiConfig from "../config/api.config";
import fetchWrapper from "./fetchWrapper.service";

class OfferService 
{
    static async getRentOffers(params)
    {
        const processedParams = Object.keys(params).map(key => {
            return `${key}=${params[key]}`;
        }).join('&');
        const response = await fetchWrapper.get(
            `${apiConfig.endpoints.search}/rent?${processedParams}`, {
            injectToken: true
        });
        return response;
    }

    static async getShareOffers(params)
    {
        const processedParams = Object.keys(params).map(key => {
            return `${key}=${params[key]}`;
        }).join('&');
        const response = await fetchWrapper.get(
            `${apiConfig.endpoints.search}/share?${processedParams}`, {
            injectToken: true
        });
        return response;
    }

    static async getOfferById(id)
    {
        const response = await fetchWrapper.get(
            `${apiConfig.endpoints.getOfferById}/${id}`, {
            injectToken: true
        });
        return response;
    }

    static async getMyOffers()
    {
        const response = await fetchWrapper.get(
            `${apiConfig.endpoints.getMyOffers}`, {
            injectToken: true
        });
        return response;
    }

    static async createOffer(offer)
    {
        const response = await fetchWrapper.post(
            `${apiConfig.endpoints.createOffer}`, {
            injectToken: true,
            body: offer
        });
        return response;
    }

    static async deleteOffer(id)
    {
        const response = await fetchWrapper.delete(
            `${apiConfig.endpoints.deleteOffer}/${id}`, {
            injectToken: true
        });
        return response;
    }

}

export default OfferService;