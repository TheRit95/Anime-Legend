import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import {
  commentDelete,
  commentPublish,
  getAllReport,
  userBan,
} from "../controllers/admin.js";

const router = Router();

// Routes protégées par le middleware
router.patch("/user/ban/:id", adminRequired, userBan);
router.patch("/comment/publish/:id", adminRequired, commentPublish);
router.delete("/comment/delete/:id", adminRequired, commentDelete);
router.get("/reported", adminRequired, getAllReport);

export default router;
