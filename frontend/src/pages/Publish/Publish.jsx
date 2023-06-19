import React from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MdCarRental, MdPeopleAlt } from "react-icons/md";
import RentPublish from "../../components/RentPublish/RentPublish";
import "./Publish.css";

const Publish = () =>
{

    const [publishOption, setPublishOption] = useState(null);

    return (
        <Container className="publish-container text-center">
            {
                publishOption === null ?
                    <>
                        <Row>
                            <Col className="text-center mt-5">
                                <h1>What do you want to publish?</h1>
                            </Col>
                        </Row>
                        <Row className="mt-5 d-flex" xs={1} md={2}>
                            <Col className="text-center mt-3 h-50 d-flex align-items-center justify-content-center">
                                <div className="publish-option p-5 d-flex flex-direction-row align-items-center justify-content-center"
                                    onClick={() => setPublishOption("share")}
                                >
                                    <MdPeopleAlt size={27} className="mt-1" />
                                    <h3 className="m-0 mx-2">
                                        Share
                                    </h3>
                                </div>
                            </Col>
                            <Col className="text-center mt-3 h-50 d-flex align-items-center justify-content-center">
                                <div className="publish-option p-5 d-flex flex-direction-row align-items-center justify-content-center"
                                    onClick={() => setPublishOption("rent")}
                                >
                                    <MdCarRental size={25} />
                                    <h3 className="m-0 mx-2">
                                        Rent
                                    </h3>
                                </div>
                            </Col>
                        </Row>
                    </>
                    :
                    null
            }
            {
                publishOption === "rent" ?
                    <RentPublish 
                        setPublishOption={setPublishOption}
                    />
                    :
                    publishOption === "share" ?
                        <h1>Share</h1>
                        :
                        null
            }
        </Container>
    );
};

export default Publish;