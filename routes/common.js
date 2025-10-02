import express from "express";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import commonController from "../controller/commonController.js";
const router = express.Router();

router.get("/", auth.isLogin, adminAuth.isLogin, commonController.loadHome);

export default router;
