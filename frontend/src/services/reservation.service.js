import apiConfig from "../config/api.config";
import fetchWrapper from "./fetchWrapper.service";

class ReservationService 
{
    static async getMyReservations()
    {
        const response = await fetchWrapper.get(
            `${apiConfig.endpoints.getMyReservations}`, {
            injectToken: true
        });
        return response;
    }

    static async createReservation(offer)
    {
        const response = await fetchWrapper.post(
            `${apiConfig.endpoints.createReservation}`, {
            injectToken: true,
            body: offer
        });
        return response;
    }

    static async deleteReservation(id)
    {
        const response = await fetchWrapper.delete(
            `${apiConfig.endpoints.deleteReservation}/${id}`, {
            injectToken: true
        });
        return response;
    }

}

export default ReservationService;