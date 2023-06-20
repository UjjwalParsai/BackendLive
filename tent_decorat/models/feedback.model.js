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
     tentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tent"
     }
})

 const Feedback=mongoose.model("feedback",feedbackSchema);
 export default Feedback;