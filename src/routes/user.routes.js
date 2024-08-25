import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controllers.js";

const router = new Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)

export default router;