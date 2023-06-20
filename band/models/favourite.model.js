import mongoose from "mongoose";

const favouriteSchema= new mongoose.Schema({
     customerId:{
        type:String,
        required:true
     },
     bandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"band"
     }
})

export const Favourite=mongoose.model("favourite",favouriteSchema);
