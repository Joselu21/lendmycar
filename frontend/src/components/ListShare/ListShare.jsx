import "./ListShare.css";
import ShareCard from "../ShareCard/ShareCard";
import { Container, Row, Col, Pagination, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import OfferService from "../../services/offer.service";
import ShareParams from "./ShareParams/ShareParams";

const ListShare = () =>
{
    // PAGINATION LOGIC 
    const itemsPerPage = 5;
    const [offers, setOffers] = useState([]);
    const [curSharePage, setCurSharePage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);

    // SEARCH PARAMS
    const [location, setLocation] = useState([0, 0]);
    const [maxDistance, setMaxDistance] = useState(null);
    const [date, setDate] = useState(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    );

    const handleSearch = async () =>
    {
        try
        {
            const params = {
                page: curSharePage,
                limit: itemsPerPage,
                maxDistance: maxDistance * 1000,
                date: date.getTime()
            };
            if (location[0] !== 0 && location[1] !== 0)
            {
                params.lat = location[0];
                params.lon = location[1];
            }
            const response = await OfferService.getShareOffers(params);
            setOffers(response.data.docs);
            setTotalPages(response.data.totalPages);
        } catch (error)
        {
            console.log(error);
        }
    };

    useEffect(() =>
    {
        handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curSharePage]);

    return (
        <>
            <Container>
                {/* Search params */}
                <Row className="mt-3">
                    <Col xs={12} md={4} lg={3} xl={2}>
                        <ShareParams
                            maxDistance={maxDistance}
                            setMaxDistance={setMaxDistance}
                            location={location}
                            setLocation={setLocation}
                            date={date}
                            setDate={setDate}
                        />
                        <Button variant="primary" className="mt-3" onClick={handleSearch}>
                            Search
                        </Button>
                    </Col>
                    <Col>
                        <Row xs={1} md={1} lg={1}>
                            {
                                offers.length === 0 ?
                                    <p className="text-center mt-5">No offers found for your criteria, try changing the filters or using the rent functionality</p> :
                                    offers.map((offer) =>
                                    {
                                        return (
                                            <ShareCard
                                                key={offer._id}
                                                offer={offer}
                                            />
                                        );
                                    })
                            }
                        </Row>
                        <Row>
                            {
                                offers.length === 0 ?
                                    null :
                                    <Col className="pagination-button d-flex align-items-center justify-content-center">
                                        <Pagination>
                                            {
                                                [...Array(totalPages).keys()].map((number) =>
                                                {
                                                    return (
                                                        <Pagination.Item key={number + 1} active={number + 1 === curSharePage} onClick={() => setCurSharePage(number + 1)}>
                                                            {number + 1}
                                                        </Pagination.Item>
                                                    );
                                                })
                                            }
                                        </Pagination>
                                    </Col>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListShare;