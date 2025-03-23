import React, { useEffect, useState } from "react";
import { getAllOperations } from "../services/operationService.js";
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Operation = () => {
  const [operations, setOperations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const data = await getAllOperations();
        console.log('Données reçues :', data)
        setOperations(data);
      } catch (err) {
        setError("Erreur lors du chargement des opérations");
      }
    };
    fetchOperations();
  }, []);
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operations.map((operation) => (
                                        <tr key={operation.id}>
                                            <td>{operation.commercialName}</td>
                                            <td>{operation.company}</td>
                                            <td>{new Date(operation.deliveryDate).toLocaleDateString("fr-FR")}</td>
                                            <td>{operation.address}</td>
                                            <td>{operation.availableLots}</td>
                                            <td>{operation.reservedLots}</td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    as={Link}
                                                    to={`/operations/${operation.id}`}
                                                >
                                                    Détails
                                                </Button>{' '}
                                                <Button variant="danger" size="sm">
                                                    Supprimer
                                                </Button>
                                            </td>
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
