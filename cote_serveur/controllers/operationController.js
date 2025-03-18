import express from "express";
import Operation from "../models/operation.js";
import Company from "../models/company.js";

const isCommercialNameUnique = async (commercialName, deliveryDate) => {
  // Calcul de l'intervalle de 10 ans
  const minDate = new Date(deliveryDate);
  minDate.setFullYear(minDate.getFullYear() - 10);

  const maxDate = new Date(deliveryDate);
  maxDate.setFullYear(maxDate.getFullYear() + 10);

  // Vérifier si une opération avec le même nom existe dans l'intervalle
  const existingOperation = await Operation.findOne({
      commercialName: commercialName,
      deliveryDate: { $gte: minDate, $lte: maxDate },
  });
  return !!existingOperation; // Renvoie true si une opération existe
};
// ✅ Ajouter une Opération
export const addOperation = async (req, res) => {
  try {
    console.log("📩 Requête reçue :", req.body);

    const { commercialName, company, deliveryDate, address, availableLots } = req.body;
    // Vérification du nom commercial
    const nameExists = await isCommercialNameUnique(commercialName, deliveryDate);
    if (nameExists) {
        return res.status(400).json({ message: "Une opération portant le même nom existe déjà dans l’intervalle de 10 ans." });
    }
    console.log(commercialName.length)

    // 🔹 Vérifier la longueur du nom
    if (commercialName.length > 24) {
      return res.status(400).json({ message: "Le nom d’une opération ne doit pas dépasser 24 caractères" });
    }

    // 🔹 Vérifier si la société existe
    const companyExists = await Company.findById(company);
    if (!companyExists) {
      return res.status(404).json({ message: "La société rattachée n’existe pas" });
    }   

    // 🔹 Créer et enregistrer l'opération
    const newOperation = new Operation({
      commercialName,
      company,
      deliveryDate,
      address,
      availableLots,
      reservedLots: 0, // ✅ Toujours 0 au début
    });

    await newOperation.save();
    console.log("🎉 Opération enregistrée avec succès !");

    res.status(201).json({ message: "Opération enregistrée avec succès", operation: newOperation });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
export function getAllOperation(req,res){
  Company.find()
    .select("commercialName company deliveryDate address availableLots reservedLots")
    .then((companies) => {
      res.status(200).json(companies);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des companies" });
    });
};
