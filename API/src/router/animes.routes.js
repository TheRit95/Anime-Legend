import { Router } from "express";
import { getAll, add, getOneById, update, remove } from "../controllers/animes.js";
import  adminRequired  from "../middlewares/adminRequired.js";

const router = Router();

// Route pour obtenir tous les animes
// http://localhost:9000/api/v1/animes

router.get("/", getAll); 

// Route pour obtenir un anime spécifique par ID
// http://localhost:9000/api/v1/animes/31  31 = id de Dbz

router.get("/:id", getOneById); 

// Route pour ajouter un anime
// http://localhost:9000/api/v1/animes

router.post("/",adminRequired,  add); // A vérifier !

// Route pour mettre à jour un anime spécifique par ID
// http://localhost:9000/api/v1/animes/31

router.patch("/:id",adminRequired,  update);

// Route pour supprimer un anime spécifique par ID
// http://localhost:9000/api/v1/animes/:id

router.delete("/:id",adminRequired,  remove);

export default router;


