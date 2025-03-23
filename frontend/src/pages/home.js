import React from 'react';
import { Container, Row, Col, Card, Button  } from 'react-bootstrap';
import '../styles/home.css'


const Home = () => {
    
    return (
        <Container className="mt-4">
            {/* Titre centré en haut */}
            <Row className="text-center mb-4">
                <Col>
                    <h1>Bienvenue dans l'application immobilière</h1>
                    <p className="lead">Gérez vos opérations et sociétés en toute simplicité</p>
                </Col>
            </Row>

            {/* Deux cartes côte à côte */}
            <Row className="justify-content-center">
                {/* Carte pour les Opérations */}
                <Col md={5} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Img
                            variant="top"
                            src="operation.avif"
                            alt="Opérations immobilières"
                            className="card-img-top"></Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Opérations</Card.Title>
                            <Card.Text>
                                Gérez vos opérations immobilières, créez de nouvelles opérations et consultez la liste des opérations existantes.
                            </Card.Text>
                            <Button variant="primary" href="/operations" title='Gérez vos opérations immoblières'>
                                Voir les opérations
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Carte pour les Sociétés */}
                <Col md={5} className="mb-4">
                    <Card className="h-100 shadow-sm">
                    <Card.Img
                            variant="top"
                            src="photo-1517048676732-d65bc937f952.avif"
                            alt="Sociètés immobilières"
                            className="card-img-top"></Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Sociétés</Card.Title>
                            <Card.Text>
                                Consultez et gérez les sociétés immobilières rattachées à vos opérations.
                            </Card.Text>
                            <Button variant="success" href="/companies" title='Gérez les sociétés immobilières '>
                                Voir les sociétés
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;