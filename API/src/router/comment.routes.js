import { Router } from "express"; // Importation du module Router d'Express
import { addComment, getCommentById, updateComment, removeComment } from '../controllers/comments.js'; // Importation des contrôleurs pour la gestion des commentaires
import userRequired from "../middlewares/userRequired.js"; // Importation du middleware pour vérifier si l'utilisateur est connecté
import adminRequired from "../middlewares/adminRequired.js"; // Importation du middleware pour vérifier les droits d'administrateur

const router = Router(); // Création d'une nouvelle instance du routeur Express

// Route pour ajouter un commentaire
// Méthode HTTP POST, nécessite que l'utilisateur soit connecté
// URL exemple : http://localhost:9000/api/v1/comments/addComment/1 (où 1 est l'ID de l'anime)
// Utilise le middleware userRequired pour vérifier que l'utilisateur est connecté
router.post("/addComment/:id", userRequired, addComment);

// Route pour récupérer tous les commentaires d'un anime spécifique par ID
// Méthode HTTP GET, permet de récupérer les commentaires d'un anime en fonction de son ID
// URL exemple : http://localhost:9000/api/v1/comments/1 (où 1 est l'ID de l'anime)
// Retourne les commentaires associés à l'anime spécifié
router.get("/:idAnime", getCommentById);

// Route pour mettre à jour un commentaire spécifique par ID
// Méthode HTTP PATCH, permet de mettre à jour un commentaire en fonction de son ID
// URL exemple : http://localhost:9000/api/v1/comments/1 (où 1 est l'ID du commentaire)
// Cette route nécessite que l'utilisateur soit administrateur
router.patch("/:id", adminRequired, updateComment); // Utilise le middleware adminRequired pour vérifier les droits d'administrateur

// Route pour supprimer un commentaire spécifique par ID
// Méthode HTTP DELETE, permet de supprimer un commentaire en fonction de son ID
// URL exemple : http://localhost:9000/api/v1/comments/1 (où 1 est l'ID du commentaire)
// Cette route nécessite que l'utilisateur soit administrateur
router.delete("/:id", adminRequired, removeComment); // Utilise le middleware adminRequired pour vérifier les droits d'administrateur

export default router; // Exporte le routeur pour l'utiliser dans d'autres parties de l'application
