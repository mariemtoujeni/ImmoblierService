import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addOperation } from "../services/operationService.js";
import { getAllCompanies } from "../services/companyService.js";

const AddOperation = () => {
    const navigate = useNavigate();

    // États pour gérer les champs du formulaire
    const [commercialName, setCommercialName] = useState("");
    const [companyId, setCompanyId] = useState(""); // ID de la société
    const [deliveryDate, setDeliveryDate] = useState("");
    const [address, setAddress] = useState("");
    const [availableLots, setAvailableLots] = useState("");
    const [companies, setCompanies] = useState([]); // Liste des sociétés
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Récupérer la liste des sociétés au chargement du composant
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data);
            } catch (err) {
                setError("Erreur lors du chargement des sociétés.");
            }
        };
        fetchCompanies();
    }, []);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les messages d'erreur et de succès
        setError("");
        setSuccess("");

        // Validation des champs obligatoires
        if (!commercialName || !companyId || !deliveryDate || !address || !availableLots) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        // Validation du nom de l'opération (24 caractères maximum)
        if (commercialName.length > 24) {
            setError("Le nom de l'opération ne doit pas dépasser 24 caractères.");
            return;
        }

        // Création de l'objet operationData
        const operationData = {
            commercialName,
            company: companyId, // ID de la société
            deliveryDate,
            address,
            availableLots: parseInt(availableLots, 10), // Convertir en nombre
            reservedLots: 0, // Par défaut, 0 lots réservés
        };

        console.log("Données envoyées :", operationData); // Affiche les données dans la console

        try {
            // Envoi des données à l'API
            const response = await addOperation(operationData);
            console.log("Opération créée :", response);

            // Afficher un message de succès et rediriger
            setSuccess("Opération créée avec succès !");
            setTimeout(() => {
                navigate("/operations"); // Rediriger vers la liste des opérations
            }, 2000); // Redirection après 2 secondes
        } catch (err) {
            setError("Erreur lors de la création de l'opération : " + err.message);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Créer une nouvelle opération</Card.Title>

                            {/* Affichage des messages d'erreur et de succès */}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            {/* Formulaire */}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nom commercial</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={commercialName}
                                        onChange={(e) => setCommercialName(e.target.value)}
                                        placeholder="Entrez le nom commercial"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Société</Form.Label>
                                    <Form.Select
                                        value={companyId} // ID de la société
                                        onChange={(e) => setCompanyId(e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionnez une société</option>
                                        {companies.map((company) => (
                                            <option key={company._id} value={company._id}>
                                                {company.name} {/* Affiche le nom de la société */}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Date de livraison</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={deliveryDate}
                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Entrez l'adresse"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre de lots disponibles</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={availableLots}
                                        onChange={(e) => setAvailableLots(e.target.value)}
                                        placeholder="Entrez le nombre de lots disponibles"
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Créer l'opération
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddOperation;