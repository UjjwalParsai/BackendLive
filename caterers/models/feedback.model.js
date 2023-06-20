import mongoose from "mongoose";

const feedbackSchema= new mongoose.Schema({
    feedback:{
      type:String,
      required:true
    },
     customerId:{
        type:String,
        required:true
     },
     catererId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"caterer"
     }
})

 const Feedback=mongoose.model("feedback",feedbackSchema);

 export default Feedback;
