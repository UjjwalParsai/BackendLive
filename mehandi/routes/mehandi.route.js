import express from "express";
import {  search,  viewAll ,viewById, savemehandi, activatemehandi, activemehandiList, removeById, topList, byPrice, byService} from "../controller/mehandi.controller.js";
import { body } from "express-validator";
import multer from "multer";
const router = express.Router();

const uploads = multer({ dest: "public/Images/" });
router.post("/save",
body("title").notEmpty(),
body("experince").notEmpty(),
body("address").notEmpty(),
body("thumbnail").notEmpty(),
body("discription").notEmpty(),
body("rating").notEmpty(),
body("license").notEmpty(),
body("services").notEmpty(),
body("longitude").notEmpty(),
body("latitude").notEmpty(),uploads.any("image"),savemehandi);              
router.post("/activeList",activemehandiList)
router.get("/view", viewAll);
router.get("/topList", topList);
router.get("/viewById/:id", viewById);
router.get("/search/:keyword", search)
router.post("/active",activatemehandi);
router.post("/removeById",removeById);
router.post("/byCharges",byPrice);
router.post("/byService",byService);


export default router;
