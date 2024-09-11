// Importation du modèle Comments pour interagir avec la base de données des commentaires
import Comments from "../model/Comments.js";

// Fonction pour ajouter un commentaire
const addComment = async (req, res) => {
    // Extraction de la note et du commentaire depuis le corps de la requête
    const { rating, comment } = req.body;
    // Extraction de l'ID de l'anime depuis les paramètres de la requête
    const { id } = req.params;

    try {
        // Ajout d'un nouveau commentaire en utilisant la méthode addComment()
        // Les informations nécessaires incluent la note, le commentaire, l'ID de l'utilisateur (depuis la session), et l'ID de l'anime
        const response = await Comments.addComment([
            rating,
            comment,
            req.session.user.id, // ID de l'utilisateur connecté
            id, // ID de l'anime
        ]);

        // Renvoie un message de succès avec l'ID du nouveau commentaire
        res.json({ msg: `Commentaire bien ajouté avec l'id ${response.insertId}` });
    } catch (error) {
        // En cas d'erreur, affiche l'erreur dans la console et renvoie une réponse avec le code 500 et un message d'erreur
        console.log(error);
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour récupérer un commentaire spécifique par ID d'anime
const getCommentById = async (req, res) => {
    // Extraction de l'ID de l'anime depuis les paramètres de la requête
    const { idAnime } = req.params;

    try {
        // Récupère les commentaires liés à un anime par son ID en utilisant la méthode getCommentById()
        const response = await Comments.getCommentById(idAnime);

        // Si des commentaires sont trouvés, les renvoie en réponse
        if (response.length > 0) {
            res.json(response);
        } else {
            // Si aucun commentaire n'est trouvé, renvoie une réponse avec le code 404
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour mettre à jour un commentaire spécifique par ID
const updateComment = async (req, res) => {
    // Extraction de l'ID du commentaire à partir des paramètres de la requête
    const { id } = req.params;
    // Extraction des données du corps de la requête
    const { note, comment, statut, user_id, anime_id } = req.body;

    try {
        // Mise à jour d'un commentaire en utilisant la méthode updateComment()
        // Les informations à mettre à jour incluent la note, le commentaire, le statut, l'ID de l'utilisateur et l'ID de l'anime
        const response = await Comments.updateComment([
            note,
            comment,
            statut,
            user_id,
            anime_id,
            id, // ID du commentaire à mettre à jour
        ]);

        // Si la mise à jour est réussie (nombre de lignes affectées > 0), renvoie un message de succès
        if (response.affectedRows > 0) {
            res.json({ msg: `Commentaire avec l'id ${id} bien mis à jour` });
        } else {
            // Si aucun commentaire n'est trouvé, renvoie une réponse avec le code 404
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour supprimer un commentaire spécifique par ID
const removeComment = async (req, res) => {
    // Extraction de l'ID du commentaire à partir des paramètres de la requête
    const { id } = req.params;

    try {
        // Suppression d'un commentaire en utilisant la méthode removeComment()
        const response = await Comments.removeComment(id);

        // Si la suppression est réussie (nombre de lignes affectées > 0), renvoie un message de succès
        if (response.affectedRows > 0) {
            res.json({ msg: `Commentaire avec l'id ${id} bien supprimé` });
        } else {
            // Si aucun commentaire n'est trouvé, renvoie une réponse avec le code 404
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Export des fonctions pour les utiliser dans d'autres parties de l'application
export { addComment, getCommentById, updateComment, removeComment };
