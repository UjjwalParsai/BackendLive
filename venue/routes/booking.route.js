import express from "express";
import { byVenueId, cancel, removeBooking, saveBooking } from "../controller/bookingDetails.action.js";

const router = express.Router();

router.post("/saveBooking", saveBooking);
router.post("/byVenueId", byVenueId);
router.post("/remove", removeBooking);
router.post('/cancel', cancel);


export default router;