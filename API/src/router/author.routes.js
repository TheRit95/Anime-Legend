import { Router } from "express";
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor } from '../controllers/authors.js';
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

router.get("/", getAllAuthors); 
router.get("/:id", getAuthorById); 
router.post("/", adminRequired, addAuthor); 
router.patch("/:id", adminRequired, updateAuthor); 
router.delete("/:id", adminRequired, removeAuthor);

export default router;
