import { Router } from "express";
import adminController from "../controller/adminController.js"
const router=Router();



router.get(['/login','/'],adminController.loadLogin)
router.post('/login',adminController.login);



export default router; 