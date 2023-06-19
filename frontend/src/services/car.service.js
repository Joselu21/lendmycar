import { uploadImage } from "./image.service";
import fetchWrapper from "./fetchWrapper.service";
import apiConfig from "../config/api.config";

class CarService
{
    static async uploadCarImage(file)
    {
        const { data } = await uploadImage(file);
        return data;
    }

    static async createCar(data)
    {
        const response = await fetchWrapper.post(
            apiConfig.endpoints.createCar, {
            body: data,
            injectToken: true
        });
        return response;
    }

    static async getCars()
    {
        const { data } = await fetchWrapper.get(
            apiConfig.endpoints.getCars, {
            injectToken: true
        });
        return data.data;
    }

    static async deleteCar(car_id)
    {
        const response = await fetchWrapper.delete(
            `${apiConfig.endpoints.deleteCar}/${car_id}`, {
            injectToken: true
        });
        return response;
    }

}

export default CarService;