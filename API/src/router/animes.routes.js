import { Router } from "express"; 
import { getAll, add, getOneById, update, remove } from "../controllers/animes.js"; 
import adminRequired from "../middlewares/adminRequired.js"; 

const router = Router(); // Crée une nouvelle instance du routeur Express

// Route pour récupérer tous les animes
// Méthode HTTP GET, aucune restriction d'accès
router.get("/", getAll); 

// Route pour récupérer un anime spécifique par ID
// Méthode HTTP GET, aucune restriction d'accès
router.get("/:id", getOneById); 

// Route pour ajouter un nouvel anime
// Méthode HTTP POST, nécessite d'être admin (middleware adminRequired)
router.post("/", adminRequired, add); 

// Route pour mettre à jour un anime spécifique par ID
// Méthode HTTP PATCH, nécessite d'être admin (middleware adminRequired)
router.patch("/:id", adminRequired, update);

// Route pour supprimer un anime spécifique par ID
// Méthode HTTP DELETE, nécessite d'être admin (middleware adminRequired)
router.delete("/:id", adminRequired, remove);

export default router; // Exporte le routeur pour l'utiliser dans d'autres parties de l'application
