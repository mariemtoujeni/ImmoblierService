// src/pages/Companies.js
import React, { useEffect, useState } from "react";
import { getAllCompanies } from "../services/companyService.js";
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fonction pour récupérer les entreprises
    const fetchCompanies = async () => {
        try {
            const data = await getAllCompanies();
            console.log('Données reçues :', data); // Affiche les données dans la console
            setCompanies(data);
        } catch (err) {
            setError("Erreur lors du chargement des entreprises");
        } finally {
            setLoading(false);
        }
    };

    // Utilisation de useEffect pour appeler l'API au chargement du composant
    useEffect(() => {
        fetchCompanies();
    }, []);

    // Affichage pendant le chargement
    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </Spinner>
                <p>Chargement des entreprises...</p>
            </Container>
        );
    }

    // Affichage en cas d'erreur
    if (error) {
        return (
            <Container className="mt-4 text-center">
                <p className="text-danger">Erreur : {error}</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            {/* Titre de la page */}
            <Row className="text-center mb-4">
                <Col>
                    <h1>Gestion des Sociétés</h1>
                    <p className="lead">Consultez et gérez vos sociétés immobilières</p>
                </Col>
            </Row>

            {/* Bouton pour créer une nouvelle société */}
            <Row className="mb-4">
                <Col>
                    <Button as={Link} to="/companies/create" variant="primary">
                        Créer une nouvelle société
                    </Button>
                </Col>
            </Row>

            {/* Tableau des sociétés */}
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            {companies.length === 0 ? (
                                <p>Aucune société trouvée.</p>
                            ) : (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Immatriculation</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.map((company) => (
                                            <tr key={company.id}>
                                                <td>{company.name}</td>
                                                <td>{company.registrationId}</td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Companies;