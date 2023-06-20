import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import { Admin } from "../model/admin.model.js";
import { Customer } from "../../customer/model/customer.model.js";
export const signin = async (request, response, next) => {
  try {
    let admin = await Admin.findOne({ email: request.body.email });
    if (admin) {
      let status = await bcrypt.compare(request.body.password, admin.password);
      if (status) {
        let payload = { subject: admin.email };
        let token = jwt.sign(payload, 'abcd');
        return response.status(200).json({ message: "login successfully", token: token, status: true });
      }
      return response.status(400).json({ error: "Bad request", status: false });
    }
  }
  catch (err) {
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const signout = async (request, response, next) => {
  try {
    console.log(request.body);
    let admin = await Admin.findOne({ email: request.body.email });
    if (admin) {
      let status = await bcrypt.compare(request.body.password, admin.password);
      if (status) {
        let payload = { subject: admin.email };
        let token = jwt.sign(payload, 'jhdkhsjkdhuei');
        return response.status(200).json({ message: "signOut successfully", token: null, status: true });
      }
      return response.status(400).json({ error: "Bad request", status: false });
    }
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const signup = async (request, response, next) => {
  console.log(request.body);
  try {
    const errors = await validationResult(request);
    if (!errors.isEmpty())
      return response.status(400).json({ error: "Bad request", messages: errors.array() });
    let saltKey = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(request.body.password, saltKey);
    request.body.password = encryptedPassword;
    let admin = await Admin.create(request.body);
    return response.status(200).json({ admin: admin, status: true });
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const update = async (request, response, next) => {  
  try {
    const saltKey = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, saltKey);
    let updateData = await Admin.updateOne({ _id: request.body.id }, { $set: { password: request.body.password } });
    if (updateData) {
      return response.status(200).json({ message: "update Successfully...", status: true });
    }
    return response.status(400).json({ error: "Bad request..", status: false });
  }
  catch (error) {
    return response.status(500).json({ message: "Internal Server Error", status: false });
  }
}

export const email =async (request,reponse,next)=>{
  try{
      let customer = Customer.findOne({email:request.body.email});
      console.log("this is the mail process")
      if(customer ){
          
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'dreamepic779@gmail.com',
                pass: 'twwofytfmemoyrif'
              }
            });
            
            var mailOptions = {
              from: 'dreamepic779@gmail.com',
              to: 'sanjupatel2308@gmail.com',
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
  catch(error){
      return reponse.status(500).json({message:"Internal server error ",status:false})
  }
}

