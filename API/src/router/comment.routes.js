import { Router } from "express";
import userRequired from "../middlewares/userRequired.js";
import { addComment, getCommentById, reportComment, removeComment } from '../controllers/comments.js';



const router = Router();

router.post("/addComment/:id", userRequired, addComment);
router.get("/:idAnime", getCommentById);
router.patch("/:id", reportComment);
router.delete("/:id", userRequired, removeComment);

export default router;
