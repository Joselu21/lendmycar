import React, { useState } from 'react';
import { Spinner, Alert } from "react-bootstrap";
import useStateHandler from "../../hooks/useStateHandler";
import HandleErrors from "../../services/error.service";
import { LuEdit2 } from "react-icons/lu";
import "./EditableImage.css";
import UserService from "../../services/user.service";
import ImageUploading from 'react-images-uploading';
import CarService from "../../services/car.service";

const EditableImage = ({ src, alt, className, isEditable, mode, onCarUpload, ...props }) =>
{
    const [image, setImage] = useState(src);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { stateHandler } = useStateHandler();

    const handleImageChange = async (files) =>
    {
        const file = files[0];
        if (!file)
        {
            return;
        }
        try
        {
            setLoading(true);
            let img = null;
            if(mode === "profile") {
                const { data } = await UserService.uploadAvatar(file);
                stateHandler.set("user_session", data);
                img = data.user_image.image_url;
            } else if(mode === "car") {
                const data = await CarService.uploadCarImage(file);
                img = data.image_url;
                onCarUpload(data);
            }
            setImage(img);
            setLoading(false);
            return;
        }
        catch (error)
        {
            setLoading(false);
            HandleErrors(error, setError);
        }
    };

    const handleError = (error) =>
    {
        setError(error);
    };

    return (<>
        <div className={`editable-image ${className}`}>
            <img src={image} alt={alt} {...props} />
            {
                isEditable &&
                <ImageUploading
                    maxNumber={1}
                    onChange={handleImageChange}
                    onError={handleError}
                    maxFileSize={15000000}
                >
                    {({ onImageUpload, isDragging, dragProps }) => (
                        <div
                            className="image-container overlay"
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            {
                                loading ?
                                    <Spinner animation="border" variant="primary" />
                                    :
                                    <>
                                        <LuEdit2 className="edit-icon" />
                                        <span>Edit image</span>

                                    </>
                            }
                        </div>
                    )}
                </ImageUploading>
            }
        </div>
        {
            error && <Alert variant="danger">{error}</Alert>
        }
    </>
    );
};

export default EditableImage;