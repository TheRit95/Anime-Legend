import Comments from "../model/Comments.js";


// Fonction pour ajouter un commentaire

const addComment = async (req, res) => {
    const { note, comment, statut, user_id, anime_id } = req.body;

    try {
        const response = await Comments.addComment([note, comment, statut, user_id, anime_id])
        
        res.json({ msg: `Commentaire bien ajouté avec l'id ${response.insertId}` });
        
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

// Fonction pour récupérer un commentaire spécifique par ID

const getCommentById = async (req, res) => {
    const { idAnime } = req.params;

    try {
        
        const response = await Comments.getCommentById (idAnime);

    console.log(response);

        if (response.length > 0) {
            res.json(response);
        } else {
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

// Fonction pour mettre à jour un commentaire spécifique par ID

const updateComment = async (req, res) => {
    const { id } = req.params;
    const { note, comment, statut, user_id, anime_id } = req.body;

    try {
        const response = await Comments.updateComment([note, comment, statut, user_id, anime_id, id])
        

        if (response.affectedRows > 0) {
            res.json({ msg: `Commentaire avec l'id ${id} bien mis à jour` });
        } else {
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

// Fonction pour supprimer un commentaire spécifique par ID

const removeComment = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Comments.removeComment(id)
        if (response.affectedRows > 0) {
            res.json({ msg: `Commentaire avec l'id ${id} bien supprimé` });
        } else {
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

export { addComment, getCommentById, updateComment, removeComment };




