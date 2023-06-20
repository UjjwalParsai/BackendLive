
import { validationResult } from "express-validator";
import { Category } from "../model/category.model.js";

export const save=async(request,response,next)=>{
    try{
    const errors=await validationResult(request);
    if(!errors.isEmpty())
     return response.status(400).json({error:"bad request",status:true});
     const category=await Category.create(request.body);
      return response.status(200).json({message:"category saved",status:true,category:request.body});
    }
    catch(err)
    {
        console.log(err);
        return response.status(500).json({error:"internal server error",status:false});
    }


}

export const list= async(request,response,next)=>{
 try{
    console.log("server heat....");
    let category=await Category.find()
    return response.status(200).json({categoryList:category,status:true})
 }
 catch(err)
 {
    return response.status(500).json({error:"internal server error",status:false})
 }
}

export const removeById=async(request,response,next)=>{
    try{
        await Category.deleteOne({_id:request.body.id})
        return response.status(200).json({message:"category deleted",status:true})
    }
    catch(err)
    {
        return response.status(500).json({error:"internal server error",status:false})
    }
}

export const update=async(request,response,next)=>{
    try{
       let category= await Category.updateOne({_id:request.params},{categoryName:request.body.categoryName})
       if(!category.modifiedCount)
        return response.status(404).json({error:"request resorses not found",status:false});
        return response.status(200).json({message:"Category updated",status:true}); 
         
    }
    catch(err)
    {
        return response.status(500).json({error:"internal server error",status:false})
    }
}