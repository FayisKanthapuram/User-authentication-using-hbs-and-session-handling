import { Router } from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get(["/","/login"],auth.isLogin, userController.loadLogin);
router.post('/login',userController.login);
router.get("/register",auth.isLogin, userController.loadRegister);
router.post("/register", userController.registerUser);
router.get("/home",auth.checkSession,userController.loadHome)
router.post('/logout',auth.checkSession,userController.logout);

export default router;
