import mongoose from "mongoose";

const favouriteSchema= new mongoose.Schema({
     customerId:{
        type:String,
        required:true
     },
     venueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"venueDetail"
     }
})

export const Favourite=mongoose.model("favourite",favouriteSchema);