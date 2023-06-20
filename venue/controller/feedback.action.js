import { validationResult } from "express-validator";
import { Feedback } from "../model/feedback.model.js";

export const addFeedback = async (request, response, next) => {
    try {
        const errors = await validationResult
            (request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });
        const venueDetails = await Feedback.create(request.body);
        return response.status(200).json({ message: "Add to favourite", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }

}
    
export const byvenueId = (request, response, next) => {
    Feedback.find({ venueId: request.params.venueId })
        .populate("venueId").then(result => {
            return response.status(200).json({ result: result });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error" });
        })
}

export const remove = async (request, response, next) => {
    try {
        let requests = await Feedback.findByIdAndDelete(request.body._id)
        if (requests)
            return response.status(200).json({ message: " remove successfully", status: true })
        return response.status(400).json({ error: "request resorses not found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false })
    }
}