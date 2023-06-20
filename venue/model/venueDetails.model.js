


import mongoose from "mongoose";

const venueDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true

    },
    contactNumber: {
        type: Number,
        required: true

    },
    thumbnail: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    charges: {
        type: Number,
        required: true

    },
    rating: {
        type: Number,
        required: true

    },
    license: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },  
    images: {
        type: []

    },
    vendorId: {
        type: String,

        required: true

    },
    status: {
        type: Boolean,
        default: false
    },
    premium: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    services: {
        type: []

    },
    catering: {
        NonvegPrice: { type: Number },
        VegPrice: { type: Number },
        Menueimage: { type: [] }
    },
})

export const VenueDetails = mongoose.model("venueDetail", venueDetailsSchema)
