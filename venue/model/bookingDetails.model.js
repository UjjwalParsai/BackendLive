import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    contactPerson: {
        type: String,
        required: true,

    },
    contactNumber: {
        type: Number,
        required: true,
    },
    totalGuest: {
        type: Number,
        required: true
    },
    typeOfEvent: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    venueDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VenueDetails"
    },
    dateOfBooking: {
        type: String,
        required: true,
        default: new Date().toString().substring(4, 15).replaceAll(' ', '-')
    },
    status: {
        type: String,
        required: true,
        default: "conform"
    }



})

export const Booking = mongoose.model("booking", bookingSchema);