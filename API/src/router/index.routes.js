import { Router } from "express";


import animes_router from "./animes.routes.js";
import auth_router from "./auth.routes.js";
import author_router from "./author.routes.js"
import comment_router from "./comment.routes.js";



const router = Router();
const BASE_API = "/api/v1";

// http://localhost:9000/
router.get("/", (req, res) => {
    res.json({msg: "connected to the API !"});
});


router.use(`${BASE_API}/auth`, auth_router);
router.use(`${BASE_API}/animes`, animes_router);
router.use(`${BASE_API}/author`, author_router);
router.use(`${BASE_API}/comments`, comment_router);



export default router;