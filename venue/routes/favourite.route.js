import express from "express";
import { addFavourite, byCustomerId, removeFromFavourite } from "../controller/favourite.action.js";
import { body } from "express-validator";

const router=express.Router();

router.post("/addFavourite",
body("customerId").notEmpty(),
body("venueId").notEmpty(),
addFavourite);
router.get("/byCustomerId/:customerId",byCustomerId);
router.post("/remove",removeFromFavourite);

export default router