import express from "express";
import { addFavourite, byCustomerId, removeFromFavourite } from "../controller/favourite.controller.js";
import {body} from "express-validator";
let router = express.Router();

router.post("/addFavourite",
body("customerId").notEmpty(),
body("mehandiId").notEmpty(),
addFavourite);
router.get("/viewByCustomer/:customerId",byCustomerId)
router.post("/remove",removeFromFavourite)



export default router;





