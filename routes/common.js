import { Router } from "express";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import commonController from "../controller/commonController.js"
const router=Router();

router.get('/',auth.isLogin,adminAuth.isLogin,commonController.loadHome);
router.get('/:id',commonController.load404)

export default router;