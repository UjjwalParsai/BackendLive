import {  validationResult } from "express-validator";
import { Vendor } from "../model/vendor.model.js";
import bcrypt from "bcryptjs"

export const signIn = async (request,response,next)=>{
    try{
      let vendor = await Vendor.findOne({email: request.body.email});
      let status = vendor ? await bcrypt.compare(request.body.password,vendor.password): false;
      return status ? response.status(200).json({message: 'Signin Success', status: true, vendor: {...vendor.toObject(),password: undefined}}) :
               response.status(401).json({message: 'Unauthorized user', status: false});
    }
    catch(err){
      console.log(err);
      return response.status(500).json({error:"Internal Server Error", status: false});
    }
  }
  export const signUp = async (request,response,next)=>{
    try{ 
     const errors = validationResult(request.body);
     console.log(request.body);
     if(!errors.isEmpty())
       return response.status(400).json({error: "Bad request", status: false, errors: errors.array()});
     const saltKey = await bcrypt.genSalt(10) 
     request.body.password = await bcrypt.hash(request.body.password,saltKey);
     
     let vendor = await Vendor.create(request.body);
     return response.status(200).json({message: "Signup success",  status: true});
    }
    catch(err){
      console.log(err)
      return response.status(500).json({error: "Internal Server Error", status: false});
    }
}

export const update=async(request,response,next)=>{
    try{
        const errors=validationResult(request);
        if(!errors.isEmpty())
         return response.status(400).json({error:"Bad request",status:false})
         const saltKey=await bcrypt.genSalt(10);
         request.body.password=await bcrypt.hash(request.body.password,saltKey);

         let vendor =await Vendor.updateOne({_id:request.params.id},{password:request.body.password})
        if(!vendor.modifiedCount)
           return response.status(404).json({error:"request resorses not found",status:false});
           return response.status(200).json({message:"password updated",status:true});
    }
    catch(err)
    {
      return response.status(500).json({error:"internal server error",status:false});
    }
}

export const byCategory = async(request,response)=>{
  try{
    console.log(request.body)
 let result = await Vendor.find({categoryId:request.body.categoryId});
 return response.status(200).json(result);
  }
  catch(err)
  {
    console.log(err)
  }
}