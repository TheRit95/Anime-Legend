import { Router } from "express"; // Importation du module Router d'Express

// Importation des différents routeurs pour les différentes parties de l'API
import animes_router from "./animes.routes.js"; 
import auth_router from "./auth.routes.js"; 
import author_router from "./author.routes.js"; 
import comment_router from "./comment.routes.js"; 
import admin_router from "./admin.routes.js";

const router = Router(); // Création d'une nouvelle instance du routeur Express
const BASE_API = "/api/v1"; // Définition de la base de l'URL pour l'API

// Route de base pour vérifier la connexion à l'API
// Méthode HTTP GET, renvoie un message pour confirmer la connexion à l'API
// URL : http://localhost:9000/
router.get("/", (req, res) => {
    res.json({msg: "connected to the API !"});
});

router.use(`${BASE_API}/admin`, admin_router);

// Routeur pour les opérations liées à l'authentification
// Toutes les routes définies dans auth_router seront accessibles sous /api/v1/auth
router.use(`${BASE_API}/auth`, auth_router);

// Routeur pour les opérations liées aux animes
// Toutes les routes définies dans animes_router seront accessibles sous /api/v1/animes
router.use(`${BASE_API}/animes`, animes_router);

// Routeur pour les opérations liées aux auteurs
// Toutes les routes définies dans author_router seront accessibles sous /api/v1/author
router.use(`${BASE_API}/author`, author_router);

// Routeur pour les opérations liées aux commentaires
// Toutes les routes définies dans comment_router seront accessibles sous /api/v1/comments
router.use(`${BASE_API}/comments`, comment_router);

export default router; // Exporte le routeur pour l'utiliser dans le fichier principal de l'application
