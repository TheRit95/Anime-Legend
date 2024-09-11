import { Router } from "express";

import { checkAuth, register, login, logout } from "../controllers/auth.js";

const router = Router();


//http://localhost:9000/api/v1/auth
router.get("/", checkAuth);
//http://localhost:9000/api/v1/auth/register
router.post("/register", register); 
//http://localhost:9000/api/v1/auth/login
router.post("/login", login);
//http://localhost:9000/api/v1/auth/logout
router.get("/logout", logout);

export default router;