import React, { useEffect, useState } from "react";
import { getAllOperations } from "../services/operationService.js";
import { getAllCompanies } from "../services/companyService.js";
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Operation = () => {
    const [operations, setOperations] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupère les opérations et les sociétés
                const [operationsData, companiesData] = await Promise.all([
                    getAllOperations(),
                    getAllCompanies(),
                ]);

                // Associe chaque opération à sa société
                const operationsWithCompanyNames = operationsData.map((operation) => {
                    const company = companiesData.find((c) => c.id === operation.companyId);
                    return {
                        ...operation,
                        company: company || { name: "Société inconnue" }, // Gère le cas où la société n'est pas trouvée
                    };
                });

                setOperations(operationsWithCompanyNames);
            } catch (err) {
                setError("Erreur lors du chargement des données");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Affichage pendant le chargement
    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </Spinner>
                <p>Chargement des opérations...</p>
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
                    <h1>Gestion des Opérations</h1>
                    <p className="lead">Consultez et gérez vos opérations immobilières</p>
                </Col>
            </Row>

            {/* Bouton pour créer une nouvelle opération */}
            <Row className="mb-4">
                <Col>
                    <Button as={Link} to="/operations/create" variant="primary">
                        Créer une nouvelle opération
                    </Button>
                </Col>
            </Row>

            {/* Tableau des opérations */}
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Société</th>
                                        <th>Date de livraison</th>
                                        <th>Adresse</th>
                                        <th>Lots disponibles</th>
                                        <th>Lots réservés</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operations.map((operation) => (
                                        <tr key={operation.id}>
                                            <td>{operation.commercialName}</td>
                                            <td>{operation.company.name}</td> {/* Affiche le nom de la société */}
                                            <td>{new Date(operation.deliveryDate).toLocaleDateString("fr-FR")}</td>
                                            <td>{operation.address}</td>
                                            <td>{operation.availableLots}</td>
                                            <td>{operation.reservedLots}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Operation;