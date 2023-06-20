import Favourite from "../models/favourite.model.js";
import { validationResult } from "express-validator";

export const addFavourite =async (request, response, next) => {
    try {
        const errors = await validationResult(request.body)
        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });
        const photographerDetails = await Favourite.create(request.body);
        let favouriteList=await Favourite.find({customerId:request.body.customerId})
        
        return response.status(200).json({favouriteList:favouriteList, message: "Add to favourite", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const viewAll = (request, response, next) => {
    const customerId=request.params.customerId 
    Favourite.find({customerId:customerId})
        .then(result => {
            
            return response.status(200).json({ favouriteList: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        })
}


export const removeFromFavourite = async (request, response, next) => {
    try {
        let photographerDetails=await Favourite.findOne(request.body)
        if(!photographerDetails)
        return response.status(400).json({ error: "request resorses not found", status: false })
        let requests = await Favourite.findByIdAndDelete(photographerDetails._id)
        if (requests){
            let favouriteList=await Favourite.find({customerId:request.body.customerId})
            return response.status(200).json({ favouriteList:favouriteList, message: "favourite remove successfully", status: true })
        }
            return response.status(400).json({ error: "request resorses not found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false })
    }
}
