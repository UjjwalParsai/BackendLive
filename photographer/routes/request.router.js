import express from "express";
import {  remove, viewById, save,confirm } from "../controller/request.controller.js";
let router = express.Router();

router.post("/save", save);
router.get("/view", viewById);
router.post("/remove", remove);
router.post("/confirm",confirm);
export default router;


