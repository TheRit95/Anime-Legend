// Importation du modèle Anime pour interagir avec la base de données des animes
import Anime from "../model/Anime.js";

// Récupérer tous les animes
const getAll = async (_req, res) => {
    try {
        // Appel à la méthode getAll pour récupérer tous les animes de la base de données
        const animes = await Anime.getAll();

        // Envoie la liste des animes en réponse au client
        res.json(animes);
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur et le code 500 (erreur serveur)
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Ajouter un nouvel anime
const add = async (req, res) => {
    // Récupération des données envoyées dans la requête
    const { title, description, genre, release_date, author_id } = req.body;

    try {
        // Ajout d'un nouvel anime avec les données fournies
        const response = await Anime.add([title, description, genre, release_date, author_id]);

        // Réponse de succès avec le titre de l'anime et l'ID généré par la base de données
        res.json({ msg: `Anime bien ajouté` });
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur et le code 500 (erreur serveur)
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Récupérer un anime spécifique par ID
const getOneById = async (req, res) => {
    // Extraction de l'ID de l'anime à partir des paramètres de la requête
    const { id } = req.params;

    try {
        // Appel à la méthode getOneById pour récupérer un anime spécifique par ID
        const anime = await Anime.getOneById(id);

        if (anime.length > 0) {
            // Si l'anime est trouvé, il est renvoyé en réponse
            res.json(anime[0]);
        } else {
            // Si l'anime n'est pas trouvé, renvoie un code 404 avec un message
            res.status(404).json({ msg: "Anime non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur et le code 500 (erreur serveur)
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Mettre à jour un anime spécifique par ID
const update = async (req, res) => {
    // Extraction de l'ID de l'anime à partir des paramètres de la requête
    const { id } = req.params;
    // Récupération des données envoyées dans la requête
    const { title, description, genre, release_date, author_id } = req.body;

    try {
        // Mise à jour de l'anime avec les nouvelles données
        const response = await Anime.update([title, description, genre, release_date, author_id, id]);

        if (response.affectedRows > 0) {
            // Si l'anime est trouvé et mis à jour, renvoie un message de succès
            res.json({ msg: `Anime bien mis à jour` });
        } else {
            // Si l'anime n'est pas trouvé, renvoie un code 404 avec un message
            res.status(404).json({ msg: "Anime non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur et le code 500 (erreur serveur)
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Supprimer un anime spécifique par ID
const remove = async (req, res) => {
    // Extraction de l'ID de l'anime à partir des paramètres de la requête
    const { id } = req.params;

    try {
        // Suppression de l'anime avec l'ID spécifié
        const response = await Anime.remove(id);

        if (response.affectedRows > 0) {
            // Si l'anime est trouvé et supprimé, renvoie un message de succès
            res.json({ msg: `Anime bien supprimé` });
        } else {
            // Si l'anime n'est pas trouvé, renvoie un code 404 avec un message
            res.status(404).json({ msg: "Anime non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, envoie un message d'erreur et le code 500 (erreur serveur)
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Export des fonctions pour les utiliser dans d'autres parties de l'application
export { getAll, add, getOneById, update, remove };
