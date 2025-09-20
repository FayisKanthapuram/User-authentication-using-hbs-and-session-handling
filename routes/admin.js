import { Router } from "express";
import adminController from "../controller/adminController.js"
import adminAuth from "../middleware/adminAuth.js";
const router=Router();



router.get(['/login','/'],adminAuth.isLogin,adminController.loadLogin)
router.post('/login',adminController.login);
router.get('/dashboard',adminAuth.checkSession,adminController.laodDashboard)
router.post('/logout',adminController.logout);
router.post('/edit-user/:id',adminAuth.checkSession,adminController.editUser)
router.post('/delete-user/:id',adminAuth.checkSession,adminController.deleteUser)
router.post('/add-user',adminAuth.checkSession,adminController.addUser)



export default router; 