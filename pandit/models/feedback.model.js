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
     panditId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pandit"
     }
})
const Feedback=mongoose.model("feedback",feedbackSchema);
export  default Feedback;