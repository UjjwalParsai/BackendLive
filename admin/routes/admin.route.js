import express from 'express';
import {signin,signup,signout,update,email} from "../controller/admin.controller.js";
import {body} from "express-validator";

//import { verify } from '../middleware/authenticate.js';
const router = express.Router();

router.post("/signin",signin); 
router.post("/signup",
 body("email","Not valid email id "),
 body("contact","digit is allowed"),
 body("password","please enter a password"),
 body("password","atleast 4 letter is mendatory"),signup);
 router.post("/signout",signout); 
 router.post("/update",update); 
 router.post("/email",email);


export default router;