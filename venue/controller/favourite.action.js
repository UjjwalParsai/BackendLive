import { validationResult } from "express-validator";
import { Favourite } from "../model/favourite.model.js";

export const addFavourite = async (request, response, next) => {
    try {
        const errors = await validationResult(request.body);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });
        const venueDetails = await Favourite.create(request.body);
        let favouriteList=await Favourite.find({customerId:request.body.customerId})
        
        return response.status(200).json({favouriteList:favouriteList, message: "Add to favourite", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }

}

export const byCustomerId = async (request, response, next) => {
    try {
        const customerId=request.params.customerId 
        const favourite = await Favourite.find({ customerId: customerId });
        try {
        //   const makeupFavourite= await axios.get('http://localhost:6062/makeup/favourite/'+{customerId});
          return response.status(200).json({ favouriteList: favourite, message: "" });
           
        } catch (error) {
            res.status(500).send('Error notifying EmailService');
        }
        
    }
    catch (err) {
        
        return response.status(500).json({ error: "Internal server error" });
    }

}

export const removeFromFavourite = async (request, response, next) => {
    try {
        let venueDetails=await Favourite.findOne(request.body)
        if(!venueDetails)
        return response.status(400).json({ error: "request resorses not found", status: false })
        let requests = await Favourite.findByIdAndDelete(venueDetails._id)
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