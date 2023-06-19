import { uploadImage } from "./image.service";
import fetchWrapper from "./fetchWrapper.service";
import apiConfig from "../config/api.config";

class UserService
{

    static async uploadAvatar(file)
    {
        const response = await uploadImage(file);
        return await UserService.updateProfile({
            user_image: {
                image_id: response.data.image_id,
            }
        });
    }

    static async updateProfile(data)
    {
        const response = await fetchWrapper.put(
            apiConfig.endpoints.updateProfile, {
            body: data,
            injectToken: true
        });
        return response;
    }

    static async deleteUser(user_id)
    {
        const response = await fetchWrapper.delete(
            `${apiConfig.endpoints.deleteUser}/${user_id}`, {
            injectToken: true
        });
        return response;
    }
}

export default UserService;