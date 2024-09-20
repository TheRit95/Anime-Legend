import { Router } from "express";
import admin_router from "./admin.routes.js";
import auth_router from "./auth.routes.js";
import animes_router from "./animes.routes.js";
import author_router from "./author.routes.js";
import comment_router from "./comment.routes.js";

const router = Router();
const BASE_API = "/api/v1";

router.get("/", (req, res) => {
  res.json({ msg: "connected to the API !" });
});

router.use(`${BASE_API}/admin`, admin_router);
router.use(`${BASE_API}/auth`, auth_router);
router.use(`${BASE_API}/animes`, animes_router);
router.use(`${BASE_API}/author`, author_router);
router.use(`${BASE_API}/comments`, comment_router);

export default router;
