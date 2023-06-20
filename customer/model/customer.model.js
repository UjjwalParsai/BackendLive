import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
    name:{
        type :String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    contact:{
        type:Number,
        require:true
    }
},{
        versionKey:false
    }
);
export const Customer = mongoose.model("customer",customerSchema);