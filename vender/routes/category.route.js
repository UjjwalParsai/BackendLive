import express from "express";
import { body } from "express-validator";
import { list, removeById, save, update } from "../controller/category.action.js";

const router =express.Router();

router.post("/save",
 body("categoryName").notEmpty(),

 
save);
router.get("/list",list);
router.post("/remove",removeById);
router.post("/update",update)


export default router
