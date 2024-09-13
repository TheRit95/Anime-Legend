import { Router } from "express"; 
import { addComment, getCommentById, reportComment, removeComment } from '../controllers/comments.js'; // Importation des contrôleurs pour la gestion des commentaires
import userRequired from "../middlewares/userRequired.js"; // Importation du middleware pour vérifier si l'utilisateur est connecté
import adminRequired from "../middlewares/adminRequired.js"; // Importation du middleware pour vérifier les droits d'administrateur

const router = Router(); // Création d'une nouvelle instance du routeur Express

// Route pour ajouter un commentaire
// Utilise le middleware userRequired pour vérifier que l'utilisateur est connecté
router.post("/addComment/:id", userRequired, addComment);

// Route pour récupérer tous les commentaires d'un anime spécifique par ID
// Retourne les commentaires associés à l'anime spécifié
router.get("/:idAnime", getCommentById);

// Route pour mettre à jour un commentaire spécifique par ID

router.patch("/:id", reportComment); 

// Route pour supprimer un commentaire spécifique par ID


// Cette route nécessite que l'utilisateur soit administrateur
router.delete("/:id", adminRequired, removeComment); // Utilise le middleware adminRequired pour vérifier les droits d'administrateur


export default router; 
