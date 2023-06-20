import mongoose from "mongoose";

const favouriteSchema= new mongoose.Schema({
     customerId:{
        type:String,
        required:true
     },
     catererId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"caterer"
     }
})

 const Favourite=mongoose.model("favourite",favouriteSchema);
export default Favourite;
