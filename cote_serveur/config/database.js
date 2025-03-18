import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("🔍 URI MongoDB:", process.env.MONGO_URI); // Debug

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connecté !");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    process.exit(1); // Stoppe l'application en cas d'échec
  }
};

export default connectDB;

