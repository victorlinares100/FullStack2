import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

function Loader({ mensaje = "Cargando contenido..." }) {
    return (
        <Container
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: '60vh' }}
        >
            <Spinner
                animation="border"
                variant="primary"
                style={{ width: '4rem', height: '4rem', borderWeight: '5px' }}
            />
            <h3 className="mt-4 text-muted fw-light">{mensaje}</h3>
        </Container>
    );
}

export default Loader;