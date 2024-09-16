import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor } from '../controllers/authors.js';


const router = Router();

router.get("/", getAllAuthors); 
router.get("/:id", getAuthorById); 
router.post("/", adminRequired, addAuthor); 
router.patch("/:id", adminRequired, updateAuthor); 
router.delete("/:id", adminRequired, removeAuthor);

export default router;
