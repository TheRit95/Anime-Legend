import { Router } from "express"; // Importation du module Router d'Express
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor } from '../controllers/authors.js'; // Importation des contrôleurs pour la gestion des auteurs
import adminRequired from "../middlewares/adminRequired.js"; // Importation du middleware pour vérifier les droits d'administrateur

const router = Router(); // Création d'une nouvelle instance du routeur Express

// Route pour récupérer tous les auteurs
// Méthode HTTP GET, accessible à tous les utilisateurs
// URL exemple : http://localhost:9000/api/v1/author
router.get("/", getAllAuthors); 

// Route pour récupérer un auteur spécifique par ID
// Méthode HTTP GET, permet de récupérer les détails d'un auteur par son ID
// URL exemple : http://localhost:9000/api/v1/author/1 (où 1 est l'ID de l'auteur)
// Exemple : id 1 = Akira Toriyama
router.get("/:id", getAuthorById); 

// Route pour ajouter un nouvel auteur
// Méthode HTTP POST, permet d'ajouter un nouvel auteur
// URL exemple : http://localhost:9000/api/v1/author
// Cette route nécessite que l'utilisateur soit administrateur
router.post("/", adminRequired, addAuthor); // Utilise le middleware adminRequired pour vérifier les droits d'administrateur

// Route pour mettre à jour un auteur spécifique par ID
// Méthode HTTP PATCH, permet de mettre à jour les informations d'un auteur par son ID
// URL exemple : http://localhost:9000/api/v1/author/:id (où :id est l'ID de l'auteur)
// Cette route nécessite que l'utilisateur soit administrateur
router.patch("/:id", adminRequired, updateAuthor); // Utilise le middleware adminRequired pour vérifier les droits d'administrateur

// Route pour supprimer un auteur spécifique par ID
// Méthode HTTP DELETE, permet de supprimer un auteur par son ID
// URL exemple : http://localhost:9000/api/v1/author/:id (où :id est l'ID de l'auteur)
// Cette route nécessite que l'utilisateur soit administrateur
router.delete("/:id", adminRequired, removeAuthor); // Utilise le middleware adminRequired pour vérifier les droits d'administrateur

export default router; // Exporte le routeur pour l'utiliser dans d'autres parties de l'application
