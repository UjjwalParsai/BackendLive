import { response } from "express";
import { Cart } from "../model/cart.model.js";

export const fetchCart = async (request,response,next)=>{
    Cart.find({customerId: request.params.customerId})
    .populate("cartItems.productId").then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Internal server error"});
    })
}
export const addToCart = async (request,response,next)=>{
 try{ 
  let cart =  await Cart.findOne({customerId: request.body.customerId});
  if(cart){
     if(cart.cartItems.some((item)=>item.productId == request.body.productId))
       return response.status(200).json({message: "Product already added in cart", status: true});
     cart.cartItems.push({productId: request.body.productId});
     let savedCart = await cart.save();
     return response.status(200).json({message: "Product successfull added in cart", status: true});
  }
  else{
    let savedCart = await Cart.create({
        customerId: request.body.customerId,
        cartItems:[{productId: request.body.productId}]
    });
    return response.status(200).json({message: "Item added successfully", status: true});
  }
 }
 catch(err){
   console.log(err); 
   return response.status(500).json({error: "Internal Server Error", status: false});
 } 
}

export const removeFromCart=async(request,response,next)=>{
  
}