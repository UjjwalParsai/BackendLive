import express from "express";
import { list, removeById, save } from "../controller/category.action.js";


const router =express.Router()

router.post("/save",save)
router.get('/list',list);
router.post("/removeById",removeById)

export default router