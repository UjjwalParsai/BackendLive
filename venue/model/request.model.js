import mongoose from "mongoose";

const requestSchema=new mongoose.Schema({
    contactPerson:{
           type:String,
           required:true,

    },
    contactNumber:{
         type:Number,
         required:true,
    },
    totalGuest:{
        type:Number,
        required:true
    },
    typeOfEvent:{
        type:String,
        required:true
    },
    checkIn:{
        type:String,
        required:true
    },
    checkOut:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    venueDetailsId:{
        type:mongoose.Schema. Types.ObjectId,
        ref:"VenueDetails"
    },

    

        
})

export const Request=mongoose.model("Request",requestSchema)