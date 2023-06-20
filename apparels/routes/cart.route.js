import express from "express";
import { addToCart, fetchCart } from "../controller/cart.action.js";

const router=express.Router();
 router.get("/fetch",fetchCart);
 router.post("/addToCart",addToCart);
 

export default router;