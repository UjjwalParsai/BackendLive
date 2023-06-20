import mongoose from "mongoose";

const favouriteSchema= new mongoose.Schema({
     customerId:{
        type:String,
        required:true
     },
     panditId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pandit"
     }
})

const Favourite=mongoose.model("favourite",favouriteSchema);
export  default Favourite;