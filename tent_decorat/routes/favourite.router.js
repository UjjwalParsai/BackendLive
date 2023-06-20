import express from "express";
import { addFavourite, byCustomerId, removeFromFavourite } from "../controller/favourite.controller.js";
let router = express.Router();

router.post("/addFavourite",addFavourite)
router.get("/viewByCustomer/:customerId",byCustomerId)
router.post("/remove",removeFromFavourite)



export default router;





