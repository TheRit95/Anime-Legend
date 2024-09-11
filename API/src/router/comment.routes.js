import { Router } from "express";
import {  addComment, getCommentById, updateComment, removeComment } from '../controllers/comments.js';
import userRequired from "../middlewares/userRequired.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();



router.post("/", userRequired, addComment); // Route pour ajouter un commentaire

// Route pour récupérer un commentaire spécifique par ID
// http://localhost:9000/api/v1/comments/:id

router.get("/:idAnime", getCommentById); 

// Route pour mettre à jour un commentaire spécifique par ID
// http://localhost:9000/api/v1/comments/:id

router.patch("/:id", adminRequired, updateComment);

// Route pour supprimer un commentaire spécifique par ID
// http://localhost:9000/api/v1/comments/:id

router.delete("/:id", adminRequired, removeComment);

export default router;

