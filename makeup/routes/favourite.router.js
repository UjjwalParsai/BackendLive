import express from "express";
import { addFavourite, byCustomerId, removeFromFavourite } from "../controller/favourite.controller.js";
let router = express.Router();
import {body} from "express-validator";

router.post("/addFavourite",addFavourite);
router.get("/byCustomerId/:customerId",byCustomerId);
router.post("/remove",removeFromFavourite);



export default router;





