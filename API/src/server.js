import "dotenv/config"; // Charge les variables d'environnement depuis un fichier .env
import { createRequire } from "module"; // Permet d'utiliser require avec les modules ES
import express from "express"; // Importation du framework Express
import session from "express-session"; // Importation du middleware pour la gestion des sessions
import cors from "cors"; // Importation du middleware pour la gestion des CORS

import pool from "./config/db.js"; // Importation du pool de connexions à la base de données
import router from "./router/index.routes.js"; // Importation du routeur principal de l'application

const require = createRequire(import.meta.url); // Création d'une fonction require pour importer les modules CommonJS
const MySqlStore = require("express-mysql-session")(session); // Importation et configuration du store MySQL pour les sessions
const app = express(); // Création d'une instance d'Express

// Configuration des options CORS
const corsOptions = cors({
    origin: "http://localhost:5173", // Autoriser les requêtes depuis ce domaine
    credentials: true, // Autoriser l'envoi de cookies avec les requêtes
});

// Configuration du store de sessions MySQL
const sessionStore = new MySqlStore(
    {
        clearExpired: true, // Effacer les sessions expirées
        checkExpirationInterval: 900000, // Intervalle pour vérifier les sessions expirées (15 minutes)
        expiration: 3600000, // Durée de vie des sessions (1 heure)
    },
    pool // Utilisation du pool de connexions à la base de données
);

// Configuration des options de session
const newSession = session({
    name: "session_id", // Nom du cookie de session
    secret: process.env.SESSION_SECRET, // Clé secrète pour signer le cookie de session (stockée dans .env)
    resave: false, // Ne pas enregistrer la session si elle n'a pas été modifiée
    saveUninitialized: false, // Ne pas enregistrer les sessions non initialisées
    store: sessionStore, // Utiliser le store de sessions MySQL
    cookie: {
        secure: false, // Ne pas utiliser le cookie sécurisé (pour développement seulement)
        httpOnly: true, // Empêcher l'accès au cookie depuis le client JavaScript
        sameSite: "lax", // Politique SameSite pour les cookies (évite l'envoi de cookies avec les requêtes cross-site)
        maxAge: 3600000, // Durée de vie du cookie de session (1 heure)
        domain: "localhost", // Domaine pour le cookie de session
    },
    rolling: true, // Renouveler la durée de vie de la session à chaque requête
});

// Middleware CORS
app.use(corsOptions);

// Middleware pour la gestion des sessions
app.use(newSession);

// Middleware pour analyser les corps de requêtes au format JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques depuis le dossier "public"
app.use(express.static("public"));

// Middleware de logging pour afficher les informations de session
app.use((req, res, next) => {
    console.log("MW", req.session); // Afficher les informations de session dans la console
    if (req.session.isAdmin) {
        console.log("hello admin"); // Afficher un message si l'utilisateur est admin
    } else {
        console.log("You are an user"); // Afficher un message si l'utilisateur est un utilisateur
    }
    next(); // Passer au prochain middleware
});

// Utilisation du routeur principal de l'application
app.use(router);

// Démarrage du serveur et écoute sur le port spécifié
app.listen(process.env.LOCAL_PORT, () => {
    console.log("Server is running at http://localhost:" + process.env.LOCAL_PORT); // Afficher un message lorsque le serveur est en cours d'exécution
});
