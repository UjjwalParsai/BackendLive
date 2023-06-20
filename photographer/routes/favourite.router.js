import express from "express";
import { viewAll, addFavourite, removeFromFavourite } from "../controller/favourite.controller.js";
import {body} from "express-validator";

let router = express.Router();


router.post("/addFavourite",
body("customerId").notEmpty(),
body("venueId").notEmpty(),
addFavourite);
router.get("/viewByCustomer", viewAll);
router.post("/remove",removeFromFavourite);


export default router;






