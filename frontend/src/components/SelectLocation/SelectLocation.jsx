import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMapEvents, useMap } from "react-leaflet";
import { Modal } from "react-bootstrap";

const LocationMarker = ({ location, setLocation }) =>
{
    // Get the coordinates of the click and set the location state
    useMapEvents({
        click: (e) =>
        {
            setLocation([e.latlng.lat, e.latlng.lng]);
        },
    });

    return location === null ? null : (
        <Marker 
            position={location}
        >
        </Marker>
    );
};

function ChangeView({ center, zoom })
{
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const SelectLocation = ({ show, onHide, location, setLocation }) =>
{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const locationCopy = useMemo(() => [...location], []);

    function onUseMyLocation()
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            setLocation([position.coords.latitude, position.coords.longitude]);
        });
    }

    function onClose()
    {
        setLocation(locationCopy);
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Select location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MapContainer center={location} zoom={8} scrollWheelZoom={true} style={{ height: "400px" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker location={location} setLocation={setLocation} />
                    <ChangeView center={location} />
                </MapContainer>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={onUseMyLocation}>Use my location</button>
                <button className="btn btn-primary" onClick={onHide}>Save</button>
                <button className="btn btn-danger" onClick={onClose}>Close</button>
            </Modal.Footer>
        </Modal>
    );


};

export default SelectLocation;;