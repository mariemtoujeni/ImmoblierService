
import mongoose from "mongoose";
import Company from "./company.js";
const { Schema, model } = mongoose;

const operationSchema = new Schema({
    commercialName:{
        type : String,
        require : true,
        maxlength : 24,
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: "Company",
        require: true,
    },
    deliveryDate:{
        type : Date,
        require: true,

    },
    address:{
        type: String,
        require : true,
    },
    availableLots:{
        type: Number,
        require : true,
        min:0

    },
    reservedLots:{
        type: Number,
        default: 0,
        min: 0,
    }
});
export default model ("Operation",operationSchema)