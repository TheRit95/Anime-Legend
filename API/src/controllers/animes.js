import Anime from "../model/Anime.js";


// Récupérer tous les animes

const getAll = async (_req, res) => {

    try {
        const animes = await Anime.getAll()

        res.json(animes);

    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message })
    }
}

// Ajouter un nouvel anime

const add = async (req, res) => {
    const { title, description, genre, release_date, author_id } = req.body;

    try {
        const response = await Anime.add([title, description, genre, release_date, author_id])
        
        res.json({ msg: `Animes '${title}' bien ajouté avec l'id ${response.insertId}` });
        
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }

}

// Récupérer un anime spécifique par ID

const getOneById = async (req, res) => {
    const { id } = req.params;

    try {
        const anime = await Anime.getOneById(id)

        if (anime.length > 0) {
            res.json(anime[0]);
        } else {
            res.status (404).json({ msg: "Anime non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

// Mettre à jour un anime spécifique par ID

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, genre, release_date, author_id } = req.body;

    try {
        const response = await Anime.update([title, description, genre, release_date, author_id, id]);

        if (response.affectedRows > 0) {
            res.json({ msg: `Anime avec l'id ${id} bien mis à jour` });
        } else {
            res.status(404).json({ msg: "Anime non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

// Supprimer un anime spécifique par ID

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Anime.remove(id)

        if (response.affectedRows > 0) {
            res.json({ msg: `Anime avec l'id ${id} bien supprimé` });
        } else {
            res.status(404).json({ msg: "Anime non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

export { getAll, add, getOneById, update, remove };

