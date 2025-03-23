import axios from "axios";

const API_URL = "http://localhost:3000/operations";

export const addOperation = async (operationData) => {
  try {
    const response = await axios.post(API_URL, operationData);
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error("Erreur serveur");
  }
};
export const getAllOperations = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur serveur");
    }
};
