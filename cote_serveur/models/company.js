
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const companySchema = new Schema({
    name:{
        type: String,
        require: true,
        
    },
    registrationId:{
        type: String,
        require: true,
        unique: true,
    }
});

export default model("Company", companySchema);