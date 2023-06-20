import { validationResult } from "express-validator";
import { Booking } from "../model/bookingDetails.model.js";

// export const confirmBooking = async (request, response, next) => {
//     console.log(request.params._id)
//     try {
//         const id = request.params._id
//         await Booking.create(id)

//         return response.status(200).json({ message: "Booking save  successfully", status: true })
//         return response.status(400).json({ error: "request resorses not found", status: false })
//     }
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: "internal server error", status: false })
//     }
// }

export const saveBooking = async (request, response, next) => {
    try {
        const errors = await validationResult(request);

        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });
        await Booking.create(request.body);
        return response.status(200).json({ message: "Booking confirm", status: true, });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }


}

export const byVenueId = async (request, response, next) => {
    try {
        let requests = await Booking.find({ venueDetailsId: request.body.venueDetailsId })
        if (requests)
            return response.status(200).json({ requests, status: true })
        return response.status(400).json({ error: "bad request", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false })
    }
}

export const cancel = async (request, response, next) => {
    try {
        let requests = await Booking.findById({ _id: request.body._id }, { _id: 0 })
        if (!requests)
            return response.status(400).json({ error: "Bad request", status: false })
        let booking = await Booking.updateOne({ _id: request.body._id }, { status: "cancel" })
        if (booking.modifiedCount)
            return response.status(200).json({ message: "Booking cancel succesfully", status: true });


    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "interval server error", status: false })
    }
}

export const removeBooking = async (request, response, next) => {
    try {
        let requests = await Booking.findByIdAndDelete(request.body._id)
        if (requests)
            return response.status(200).json({ message: "request remove successfully", status: true })
        return response.status(400).json({ error: "request resorses not found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false })
    }
}