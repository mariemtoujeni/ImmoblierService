import express from 'express'
import Company from "../models/company.js"



// ✅ Ajouter une société
export const addCompany = async (req, res) => {
  try {
    console.log("📩 Requête reçue :", req.body); // Log des données reçues

    const { name, registrationId } = req.body;

    // Vérifier si l'identifiant de société est unique
    const existingCompany = await Company.findOne({ registrationId });
    if (existingCompany) {
      return res.status(400).json({ message: "Une société avec cet identifiant existe déjà" });
    }

    // Créer et enregistrer la société
    const newCompany = new Company({ name, registrationId });
    await newCompany.save();
    console.log("🎉 Société enregistrée avec succès !");

    res.status(201).json({ message: "Société enregistrée avec succès", company: newCompany });
  } catch (error) {
    console.error("❌ Erreur serveur :", error); // Ajout de l'erreur complète
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
export function getAllCompany(req,res){
  Company.find()
    .select("name registrationId")
    .then((companies) => {
      res.status(200).json(companies);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des companies" });
    });
}

          