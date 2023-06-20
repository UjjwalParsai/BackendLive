import express from "express";
import { add, byvenueId, confirm, remove } from "../controller/request.action.js";
import {body} from "express-validator";

const router =express.Router();

router.post("/add",
  body("contactPerson").notEmpty(),
  body("contactNumber").notEmpty(),
  body("totalGuest").notEmpty(),
  body("typeOfEvent").notEmpty(),
  body("checkIn").notEmpty(),
  body("checkOut").notEmpty(),
  body("customerId").notEmpty(),add);
router.post("/byVenueId",byvenueId);

router.post("/remove/:_id",remove);

router.post('/confirm',confirm);

export default router;