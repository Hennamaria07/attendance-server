import { Router } from "express";
import { create, getProjects } from "../controllers/project.controllers.js";
import { verifyUser } from "../middlewares/verifyjwt.middleware.js";

const router = new Router();

router.route('/add').post(verifyUser, create);
router.route('/get-all').get(verifyUser, getProjects);

export default router;