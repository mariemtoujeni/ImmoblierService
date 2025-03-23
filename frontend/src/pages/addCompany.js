// src/pages/AddCompany.js
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addCompany } from "../services/companyService.js";

const AddCompany = () => {
    const navigate = useNavigate();

    // États pour gérer les champs du formulaire
    const [name, setName] = useState("");
    const [registrationId, setregistrationId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les messages d'erreur et de succès
        setError("");
        setSuccess("");

        // Validation des champs obligatoires
        if (!name || !registrationId ) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        // Création de l'objet companyData
        const companyData = {
            name,
            registrationId,          
            
        };

        console.log("Données envoyées :", companyData); // Affiche les données dans la console

        try {
            // Envoi des données à l'API
            const response = await addCompany(companyData);
            console.log("Société créée :", response);

            // Afficher un message de succès et rediriger
            setSuccess("Société créée avec succès !");
            setTimeout(() => {
                navigate("/companies"); // Rediriger vers la liste des sociétés
            }, 2000); // Redirection après 2 secondes
        } catch (err) {
            setError("Erreur lors de la création de la société : " + err.message);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Créer une nouvelle société</Card.Title>

                            {/* Affichage des messages d'erreur et de succès */}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            {/* Formulaire */}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nom de la société</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Entrez le nom de la société"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>L'immatriculation</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={registrationId}
                                        onChange={(e) => setregistrationId(e.target.value)}
                                        placeholder="Entrez l'immatriculation de la socièté"
                                        required
                                    />
                                </Form.Group>

                                

                             

                                <Button variant="primary" type="submit">
                                    Créer la société
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddCompany;