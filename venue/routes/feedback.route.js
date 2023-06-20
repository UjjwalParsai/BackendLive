import express from "express";
import { addFeedback,byvenueId, remove } from "../controller/feedback.action.js";


const router=express.Router();


router.post("/addFeedback",addFeedback)
router.get("/byvenueId/:venueId",byvenueId)
router.post("/remove",remove)
export default router