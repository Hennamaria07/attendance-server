import { Router } from "express";
import { create, deleteAttendance, getAttendances } from "../controllers/attendance.controllers.js";
import { verifyUser } from "../middlewares/verifyjwt.middleware.js";

const router = new Router();

router.route('/add').post(verifyUser, create);
router.route('/get-all').get(verifyUser, getAttendances);
router.route('/:id').get(verifyUser, deleteAttendance);

export default router;