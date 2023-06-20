import mongoose from 'mongoose';

const favouriteSchema= new mongoose.Schema({
  customerId:{
     type:String,
     required:true
  },
  bandId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"buggyDetails"
  }
})

 const Favourite=mongoose.model("favourite",favouriteSchema);
 export default Favourite;