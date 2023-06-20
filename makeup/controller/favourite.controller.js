import { validationResult } from "express-validator";
import  Favourite  from "../models/favourite.model.js";



export const addFavourite=async(request,response,next)=>{
    try{
        const errors=await validationResult(request);
        if(!errors.isEmpty())
         return response.status(400).json({error:"bad request",status:true});
         const makeup=await Favourite.create(request.body);
         let favouriteList=await Favourite.find({customerId:request.body.customerId})
          return response.status(200).json({favouriteList:favouriteList, message:"Add to favourite",status:true});
        }
        catch(err)
        {
            console.log(err);
            return response.status(500).json({error:"internal server error",status:false});
        }
    
}

export const byCustomerId=(request,response,next)=>{
    Favourite.find({customerId: request.params.customerId})
    .populate("venueId").then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Internal server error"});
    })

}

export const removeFromFavourite= async(request,response,next)=>{
    try {
        let makeups=await Favourite.findOne(request.body)
        if(!makeups)
        return response.status(400).json({ error: "request resorses not found", status: false })
        let requests = await Favourite.findByIdAndDelete(makeups._id)
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