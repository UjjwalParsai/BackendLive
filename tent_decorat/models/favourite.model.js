import mongoose from "mongoose";

const favouriteSchema= new mongoose.Schema({
     customerId:{
        type:String,
        required:true
     },
     tentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tent"
     }
})

 const Favourite=mongoose.model("favourite",favouriteSchema);
 export default Favourite;