import apiConfig from "../config/api.config";
import fetchWrapper from "./fetchWrapper.service";
import axios from "axios";

async function requestUploadImageURL()
{
    const { data } = await fetchWrapper.post(apiConfig.endpoints.uploadImage, { injectToken: true });
    return data.result.uploadURL;
}

async function uploadImage(file)
{
    try
    {
        const url = await requestUploadImageURL();

        let bodyForCloudflare = new FormData();

        bodyForCloudflare.append("file", file.file);
        bodyForCloudflare.enctype = "multipart/form-data";

        const cloudflareResponse = await axios({
            method: "post",
            url,
            data: bodyForCloudflare,
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (cloudflareResponse.data.success)
        {
            return {
                response: { ok: true },
                data: {
                    image_id: cloudflareResponse.data.result.id,
                    image_url: cloudflareResponse.data.result.variants[0]
                }
            };
        }
        throw new Error("Cloudflare upload failed");
    }
    catch (err)
    {
        console.error(err);
        return { response: { ok: false }, data: null };
    }

}

export
{
    uploadImage
};