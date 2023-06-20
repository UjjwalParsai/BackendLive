import { validationResult } from "express-validator";
import { Request } from "../model/request.model.js";
import { Booking } from "../model/bookingDetails.model.js";

export const add = async (request, response, next) => {
    console.log(request.body)
    try {
        const errors = await validationResult(request.body);

        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });

        const category = await Request.create(request.body);

        return response.status(200).json({ message: "request added", status: true, });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byvenueId = async (request, response, next) => {
    try {
        let requests = await Request.find({ venueDetailsId: request.body.venueDetailsId })
        if (requests)
            return response.status(200).json({ requests, status: true })
        return response.status(400).json({ error: "bad request", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false })
    }
}
export const confirm = async (request, response, next) => {
    try {
        let requests = await Request.findById({ _id: request.body._id }, { _id: 0 })
        if (!requests)
            return response.status(400).json({ error: "Bad request", status: false })

        //   console.log(requests)
        await Booking.create(requests.toObject())
        await Request.deleteOne({ _id: request.body._id })
        return response.status(200).json({ message: "Booking confirm", status: true })

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "interval server error", status: false })
    }
}

// export const remove = async (request, response, next) => {
//     try {
//         let requests = await Request.findByIdAndDelete(request.body._id)
//         if (requests)
//             return response.status(200).json({ message: "request remove successfully", status: true })
//         return response.status(400).json({ error: "request resorses not found", status: false })
//     }
//     catch (err) {
//         return response.status(500).json({ error: "internal server error", status: false })
//     }
// }
export const remove = async (request, response, next) => {
    console.log(request.params._id)
    try {
        const id = request.params._id
        let requests = await Request.findByIdAndDelete(id)
        if (requests)
            return response.status(200).json({ message: "request remove successfully", status: true })
        return response.status(400).json({ error: "request resorses not found", status: false })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false })
    }
}