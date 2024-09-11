import { Router } from "express"; // Importation du module Router d'Express
import { checkAuth, register, login, logout } from "../controllers/auth.js"; // Importation des contrôleurs pour la gestion de l'authentification

const router = Router(); // Création d'une nouvelle instance du routeur Express

// Route pour vérifier l'état de l'authentification de l'utilisateur
// Méthode HTTP GET, accessible à tous les utilisateurs connectés
// URL exemple : http://localhost:9000/api/v1/auth
router.get("/", checkAuth); 

// Route pour enregistrer un nouvel utilisateur
// Méthode HTTP POST, permet de créer un nouvel utilisateur
// URL exemple : http://localhost:9000/api/v1/auth/register
router.post("/register", register); 

// Route pour connecter un utilisateur
// Méthode HTTP POST, permet aux utilisateurs de se connecter
// URL exemple : http://localhost:9000/api/v1/auth/login
router.post("/login", login); 

// Route pour déconnecter un utilisateur
// Méthode HTTP GET, permet de se déconnecter de la session en cours
// URL exemple : http://localhost:9000/api/v1/auth/logout
router.get("/logout", logout);

export default router; // Exporte le routeur pour l'utiliser dans d'autres parties de l'application
