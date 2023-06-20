import express from "express";
import { getProduct, getProductByCategory, list } from "../controller/product.action.js";


const router=express.Router();
 router.get("/list",list);
 router.post("/byCategory",getProductByCategory);
 router.post("/getProduct",getProduct);
export default router;