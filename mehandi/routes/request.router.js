import express from "express";
import { saveMultiple, remove, viewAll } from "../controller/request.controller.js";
let router = express.Router();

router.post("/save", saveMultiple);
router.get("/view", viewAll);
router.delete("/remove/:id", remove);//done and check...
// router.get("/search/:date",searchBydate)


export default router;
/*
http://localhost:8009/request/save
http://localhost:8009/request/view
http://localhost:8009/request/remove/{_id}
 */




