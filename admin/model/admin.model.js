import mongoose from "mongoose";    
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true
    },
    password :{
        type:String,
        require:true,   
        
    },
    contact:{
        type:Number,
        require:true
    }
    
});
export const Admin = mongoose.model("admin",adminSchema);