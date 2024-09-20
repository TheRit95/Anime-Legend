import { Router } from "express";
import { checkAuth, register, login, logout } from "../controllers/auth.js";

const router = Router();

router.get("/", checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
