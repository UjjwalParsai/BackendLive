import mongoose from "mongoose";
const photoStudioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    experience: { type: String, required: true },

    thumbnail: { type: String },
    rating: { type: String },
    description: {
        type: String,
        required: true,
      },
    services: [{
        service: { type: String, required: true },
        price: { type: Number, required: true }, 
    }],
    images: [],
    vendorId: { type: String, required: true },
    premium: {
        type: String,
        required: true,
        default: "false"
    },
    status:{
        type:String,
        required:true,
        default:'false'
    },


});


const Photographer = mongoose.model('photographer', photoStudioSchema);

export default Photographer;