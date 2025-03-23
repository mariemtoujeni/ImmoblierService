import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from "./config/database.js"
import companyRoute from "./routes/companyRoute.js"
import operationRoute from "./routes/operationRoute.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();
//Routes
app.use("/companies", companyRoute)
app.use ("/operations",operationRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
