import axios from "axios";

const API_URL = "http://localhost:3000/companies"; 

export const addCompany = async (companyData) => {
  try {
    const response = await axios.post(API_URL, companyData);
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error("Erreur serveur");
  }
};
export const getAllCompanies = async (companyData) => {
    try {
      const response = await axios.post(API_URL, companyData);
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : new Error("Erreur serveur");
    }
  };
