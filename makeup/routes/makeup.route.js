import express from "express";
import { search, viewAll, viewById, activatemakeup, activemakeupList, removeById, topList,  savemakeup, byPrice } from "../controller/makeup.controller.js";
import { body } from "express-validator";
import multer from "multer";
const router = express.Router();
const uploads = multer({ dest: "public/Images/" });

router.post("/save",

    body("title").notEmpty(),
    body("experince").notEmpty(),
    body("contactNumber", "Empty No.").notEmpty(),
    body("address").notEmpty(),
    body("thumbnail").notEmpty(),
    body("discription").notEmpty(),
    body("rating").notEmpty(),
    body("license").notEmpty(),
    body("services").notEmpty(),
    body("longitude").notEmpty(),
    body("latitude").notEmpty(),uploads.any("image"),savemakeup);
router.post("/activeList", activemakeupList)
router.get("/view", viewAll);
router.get("/topList", topList);
router.get("/viewById/:id", viewById);
router.get("/search/:keyword", search)
router.post("/active", activatemakeup);
router.post("/removeById", removeById);
router.post("/byPrice",byPrice);


export default router;
