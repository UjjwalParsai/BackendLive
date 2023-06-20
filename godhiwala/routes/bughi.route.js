import express from "express";
import { activateBuggy, activeBuggyList, removeById, saveBuggy, search, viewAll, viewById } from "../controller/buggy.controller.js";
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
    body("latitude").notEmpty(),uploads.any("image"), saveBuggy);
router.post("/activeList", activeBuggyList)
router.get("/view", viewAll);
router.get("/viewById/:id", viewById);
router.get("/search/:keyword", search)
router.post("/active", activateBuggy);
router.post("/removeById", removeById);

export default router;
