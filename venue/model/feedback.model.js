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
     venueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"venueDetail"
     },
     date:{
      type:String,
      required:true,
      default:new Date().toString().substring(4,15).replaceAll(' ',"-")
     }
})

export const Feedback=mongoose.model("feedback",feedbackSchema);