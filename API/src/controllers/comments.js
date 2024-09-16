import Comments from "../model/Comments.js";

const addComment = async (req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.params;

    try {
        const response = await Comments.addComment([
            rating,
            comment,
            req.session.user.id,
            id,
        ]);

        res.json({ msg: `Commentaire bien ajouté` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

const getCommentById = async (req, res) => {
    const { idAnime } = req.params;

    try {
        const response = await Comments.getCommentById(idAnime);
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

const reportComment = async (req, res) => {
    const { id } = req.params;
    const response = await Comments.reportComment(id);
    return res.json(response);
};

const removeComment = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Comments.removeComment(id, req.session.user.id);

        if (response.affectedRows > 0) {
            res.json({ msg: `Commentaire bien supprimé` });
        } else {
            res.status(404).json({ msg: "Commentaire non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

export { addComment, getCommentById, reportComment, removeComment };
