import { Booking } from "../models/bookingDetails.model.js";
import Request from "../models/request.model.js";

export const save = (request, response, next) => {
    Request.create(request.body.requests)
        .then(result => {
            return response.status(200).json({ Message: "Request are saved...", status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        })
}

export const viewById = async (request, response, next) => {
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

      
        await Booking.create(requests.toObject())
        await Request.deleteOne({ _id: request.body._id })
        return response.status(200).json({ message: "Booking confirm", status: true })

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "interval server error", status: false })
    }
}



export const remove = async (request, response, next) => {
    try {
        let requests = await Request.findByIdAndDelete(request.body._id)
        if (requests)
            return response.status(200).json({ message: "request remove successfully", status: true })
        return response.status(400).json({ error: "request resorses not found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false })
    }
}