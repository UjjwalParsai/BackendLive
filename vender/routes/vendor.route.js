import express from "express"
import { byCategory, signIn, signUp } from "../controller/venue.action.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/singIn", signIn);
router.post("/signUp",
    body("name", "Name is required").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("contact").notEmpty(),
    body("contact").isNumeric(),
    body("categoryId").notEmpty(),
    signUp);

router.post("/by-category",byCategory)



export default router;