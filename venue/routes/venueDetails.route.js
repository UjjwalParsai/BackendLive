import express from "express"
import { allList, activate, saveImages, fetchById, removeById, save, activeList, topList, search, byCategory, byCapacity, byCharges } from "../controller/venueDetails.action.js";
import { body } from "express-validator";
import multer from "multer";

const uploads = multer({ dest: "public/Images/" });
const router = express.Router();


router.post("/save",
   body("title", "title").notEmpty(),
   body("capacity").notEmpty(),
   body("address").notEmpty(),
   body("description").notEmpty(),
   body("charges").notEmpty(),
   body("rating").notEmpty(),
   body("license").notEmpty(),
   body("longitude").notEmpty(),
   body("latitude").notEmpty(),
   body("vendorId").notEmpty(), save);
router.get("/fetchById/:id", fetchById);
router.get("/allList", allList);
router.post("/deactivate", removeById);
router.post("/activate", activate);
router.get("/activeList", activeList);
router.get("/topList", topList);
router.post("/addImage", uploads.any("image"), saveImages);
router.get("/search/:keyword", search);
router.post("/byCategory", byCategory);
router.post("/byCapacity", byCapacity);
router.post("/byCharges", byCharges);
export default router;