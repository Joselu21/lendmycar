import "./Search.css";
import { Container, Row, Col, Button } from 'react-bootstrap';
import ListRent from "../../components/ListRent/ListRent";
import ListShare from "../../components/ListShare/ListShare";
import { useState } from "react";
import logo from "../../assets/logo.png";

const Search = () =>
{

    const [selected, setSelected] = useState("rent");

    return (
        <Container className="text-center search">
            <Row>
                <Col
                    className="d-flex text-center align-items-center"
                >
                    <img src={logo} alt="logo" className="logo" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        onClick={() => setSelected("rent")}
                        className={`search-select-button ${selected === "rent" ? "active" : ""}`}
                    >
                        Rent
                    </Button>
                    <Button
                        onClick={() => setSelected("share")}
                        className={`search-select-button ${selected === "share" ? "active" : ""}`}
                    >
                        Share
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        selected === "rent" ?
                            <ListRent />
                            :
                            <ListShare />
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Search;