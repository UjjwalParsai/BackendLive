import express from "express";
import { list, removeById, save, update } from "../controller/category.action.js";

const router=express.Router();

router.post("/save",save)
router.get('/list',list);
router.post("/removeById",removeById)
router.post("/update/:id",update)

export default router