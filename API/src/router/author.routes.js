import { Router } from "express";
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor } from '../controllers/authors.js';

import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

// Route pour récupérer tous les auteurs
// http://localhost:9000/api/v1/author // ok !!

router.get("/", getAllAuthors);

// Route pour récupérer un auteur spécifique par ID
// http://localhost:9000/api/v1/author/1 // ex : id 1 = Akira toriyama // ok !!

router.get("/:id", getAuthorById);

// Route pour ajouter un auteur
// http://localhost:9000/api/v1/author

router.post("/", adminRequired, addAuthor); // Utiliser adminRequired pour l'ajout

// Route pour mettre à jour un auteur spécifique par ID
// http://localhost:9000/api/v1/author/:id

router.patch("/:id", adminRequired, updateAuthor); // Utiliser adminRequired pour la mise à jour

// Route pour supprimer un auteur spécifique par ID
// http://localhost:9000/api/v1/author/:id

router.delete("/:id", adminRequired, removeAuthor); // Utiliser adminRequired pour la suppression

export default router;