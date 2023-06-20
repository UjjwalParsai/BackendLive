import mongoose from "mongoose";

const favouriteSchema= new mongoose.Schema({
     customerId:{
        type:String,
        required:true
     },
     mehandiId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"mehandi"
     }
})

 const Favourite=mongoose.model("favourite",favouriteSchema);
 export default Favourite;