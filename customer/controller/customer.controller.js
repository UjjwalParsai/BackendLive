import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { Customer } from "../model/customer.model.js";
import jwt from "jsonwebtoken"
// import emailjs from "emailjs-com";
import nodemailer from "nodemailer";


  export const email =async (request,reponse,next)=>{
    try{
        let customer = Customer.findOne({email:request.body.email});
        console.log("this is the mail process")
        if(customer ){
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'karadiyatarun0@gmail.com',
                  pass: ''
                }
              });
              
              var mailOptions = {
                from: 'karadiyatarun0@gmail.com',
                to: 'rajjatwa202@gmail.com',
                subject: 'Sending Email using Node.js', 
                text: 'hello world'
              };
              
              transporter.sendMail(mailOptions , function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
          return reponse.status(200).json({message:"email sent ",status:true});
            }
          return reponse.status(400).json({error:"Bad request",status:false});   
    }
    catch(err){
       console.log(err);
        return reponse.status(500).json({message:"Internal server error ",status:false})
    }
  }



export const signup = async(request,response,next)=>{  
  console.log(request.body) 
    try{
        const errors =  validationResult(request.body);
        if(!errors.isEmpty())
            return response.status(400).json({error:"Bad request",status:false,errors:errors.array()});
            const saltKey = await bcrypt.genSalt(10);
            request.body.password =await bcrypt.hash(request.body.password,saltKey);
            let customer =await Customer.create(request.body);
            return response.status(200).json({message:"signup successfull",status:true});
        
    }
    catch(err){
      console.log(err);
        return response.status(500).json({message:"Internal Server Error",status:false});
    }
}
export  const signin = async (request,response,next)=>{
    try{
         let customer =await Customer.findOne( {email:request.body.email});
         if(customer){
           let status =await bcrypt.compare(request.body.password,customer.password);
           if(status) { 
            let payload = {subject:customer.email};
            let token = jwt.sign(payload,'abcd');
           return response.status(200).json({ customer,token:token,status:true}); 
           }
           return response.status(400).json({error:"Bad Request",status:false});
         }
         return response.status(404).json({error:"request resores not found",status:false});
    }
    catch(err){
        return response.status(500).json({message:"Internal Server Error",status:false});
    }
}


export  const signout = async (request,response,next)=>{
    try{
        console.log(request.body);
         let customer =await Customer.findOne( {email:request.body.email});
         if(customer){
            let status = await bcrypt.compare(request.body.password,customer.password);
           if(status) { 
            let payload = {subject:customer.email};
            let token = jwt.sign(payload,'abcd');
           return response.status(200).json({message:"SighOut Successfully..",token:null,status:true}); 
           }
           return response.status(400).json({error:"Bad Request",status : false});
         }
    }
    catch(err){
        return response.status(500).json({message:"Internal Server Error",status:false});
    }
}

export const updatePassword =async (request,response,next)=>{

    try{
      const saltKey = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password,saltKey);
       let updatedData =await Customer.updateOne({_id:request.body.id},{$set:{password:request.body.password}});
       console.log(request.body.id)
       if(updatedData){
        return response.status(200).json({message:"update successfully ",status :true})
       }
       return response.status(400).json({error:"Bad request ",status :false})
       
    }
    catch(error){
        return response.status(500).json({message:"Internal Server Error",status:false});
    }

}

export const updateProfile=async (request,response,next)=>{

  try{
     let updatedData =await Customer.updateMany({_id:request.body.id},{$set:{name:request.body.name,contact:request.body.contact}});
     console.log(request.body.id)
     if(updatedData){
      return response.status(200).json({message:"update successfully ",status :true})
     }
     return response.status(400).json({error:"Bad request ",status :false})
     
  }
  catch(error){
      return response.status(500).json({message:"Internal Server Error",status:false});
  }

}

export  const fetch = async (request,response,next)=>{
  try{
       let customer =await Customer.find();
       if(customer){
         return response.status(200).json({ message:"fetch Successfully..",customer:customer,status:true}); 
         }
         return response.status(400).json({error:"Bad Request",status : false});
       }
  catch(error){
      return response.status(500).json({message:"Internal Server Error",status:false});
  }
}

