import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                
                <Navbar.Brand as={Link} to="/">
                ImmobilierPro
                </Navbar.Brand>

                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Liens de navigation */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Accueil
                        </Nav.Link>
                        <Nav.Link as={Link} to="/operations">
                            Opérations
                        </Nav.Link>
                        <Nav.Link as={Link} to="/companies">
                            Sociétés
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;