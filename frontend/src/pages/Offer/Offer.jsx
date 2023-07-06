import { useEffect, useState } from "react";
import "./Offer.css";
import { useParams } from "react-router-dom";
import OfferService from "../../services/offer.service";
import RentOffer from "../../components/RentOffer/RentOffer";
import ShareOffer from "../../components/ShareOffer/ShareOffer";

const Offer = () =>
{

    const { id } = useParams();
    const [offer, setOffer] = useState(null);

    useEffect(() =>
    {
        const getOffer = async () =>
        {
            try
            {
                const response = await OfferService.getOfferById(id);
                setOffer(response.data);
            } catch (error)
            {
                console.log(error);
            }
        };
        getOffer();
    }, [id]);

    return (<>
        {
            offer && offer.__t === "Rent" ?
                <RentOffer offer={offer} />
                :
                <ShareOffer offer={offer} />
        }
    </>
    );
};

export default Offer;