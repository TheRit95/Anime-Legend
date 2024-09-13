// Importation du modèle Auth pour la gestion des utilisateurs
import Auth from "../model/Auth.js";

// Vérifie si l'utilisateur est authentifié
const checkAuth = (req, res) => {
    
 // Répond avec un message de succès et les informations de l'utilisateur si connecté       
    res.json({message: "Utilisateur connecté", user: req.session.user || {}});
};

// Fonction pour l'inscription d'un utilisateur
const register = async (req, res) => {
    try {
        // Appel au modèle Auth pour l'inscription avec les données envoyées par le client
        const result = await Auth.register(req.body);

        // Sauvegarde des informations utilisateur dans la session après l'inscription
        req.session.user = { 
            id: result.insertId,                // ID utilisateur généré par la base de données
            username: req.body.username,        // Nom d'utilisateur fourni lors de l'inscription
            email: req.body.email,              // Email de l'utilisateur
            isAdmin: 0                          // Définit si l'utilisateur est admin (ici 0 par défaut)
        };

        // Répond avec un message de succès et les informations de l'utilisateur
        res.status(201).json({ message: "Inscription réussie", user:req.session.user});
    } catch (error) {
        console.log(error);

        // renvoie une erreur 500 en cas de problème serveur
        res.status(500).json({ message: "Erreur de serveur", error: error.message });
    }
};


const login = async (req, res) => {  // Fonction pour la connexion d'un utilisateur
    try {
        // Appel au modèle Auth pour vérifier les informations de connexion
        const result = await Auth.login(req.body);
        console.log(result);
        req.session.user = {                 // Sauvegarde des informations utilisateur dans la session après la connexion
            id: result.id,                   // ID de l'utilisateur récupéré de la base de données
            username: result.username,       // Nom d'utilisateur récupéré
            email: result.email,             // Email récupéré
            isAdmin: result.isAdmin          // Statut admin récupéré
        };
        res.status(201).json({ message: "Connexion réussie", user:req.session.user });  // Répond avec un message de succès et les informations de l'utilisateur
    } catch (error) {
        res.status(500).json({ message: "Erreur de connexion", error: error.message });  // Répond avec une erreur 500 en cas de problème lors de la connexion
    }
};

const logout = async (req, res) => {   // Fonction pour la déconnexion de l'utilisateur
    req.session.destroy((err) => {     // Détruit la session pour déconnecter l'utilisateur
        if(err){
            return res.status(500).json({message: "Erreur de serveur"});  // Renvoie une erreur 500 si la destruction de la session échoue
        }
        res.clearCookie("session_id");                                  // Supprime le cookie de session côté client
        res.status(200).json({message: "Déconnexion réussie"});         // Répond avec un message de succès de déconnexion
    });
};

export { checkAuth, login, register, logout };   // Export des fonctions pour les utiliser dans d'autres parties de l'application

