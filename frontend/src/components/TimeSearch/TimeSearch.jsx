import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Container, Button, Form } from 'react-bootstrap';
import "./TimeSearch.css";
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es);


const TimeSearch = () =>
{
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center time-search">
            <Form className="mt-5 d-flex flex-row">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat={"dd/MM/yyyy"}
                    className="my-1"
                    locale="es"
                /> 
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat={"dd/MM/yyyy"}
                    className="my-1 mx-2"
                    locale="es"
                />
                <Button variant="outline-primary">Search</Button>
            </Form>
        </Container>
    );
};

export default TimeSearch;
