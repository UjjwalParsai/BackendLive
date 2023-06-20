import express from "express";
import { body } from "express-validator";
import { signup ,signin,signout,email,updatePassword,updateProfile,fetch} from "../controller/customer.controller.js";
const router = express.Router();

router.post ("/signup",
body("name").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),
body("password").isLength({min:5,max:10}),
body("contact").notEmpty(),
body("contact").isNumeric(),
signup);
router.post("/signin",signin);
router.post("/email",email);
router.post("/updatePassword",updatePassword);
router.post("/updateProfile",updateProfile);
router.get("/fetch",fetch);



export default router;