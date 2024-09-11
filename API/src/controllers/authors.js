import Authors from "../model/Authors.js";

// Fonction pour récupérer tous les auteurs
const getAllAuthors = async ( _req, res) => {
    try {
        const authors = await Authors.getAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour récupérer un auteur spécifique par ID
const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Authors.getById(id);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ msg: "Auteur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour ajouter un nouvel auteur
const addAuthor = async (req, res) => {
    const { name, bio, birthdate } = req.body;
    
    if (!name || !bio || !birthdate) {
        return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    try {
        const authorId = await Authors.add({ name, bio, birthdate });
        res.json({ msg: `Auteur bien ajouté avec l'id ${authorId}` });
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour mettre à jour un auteur spécifique par ID
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, bio, birthdate } = req.body;

    if (!name || !bio || !birthdate) {
        return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    try {
        const affectedRows = await Authors.update(id, { name, bio, birthdate });
        if (affectedRows > 0) {
            res.json({ msg: `Auteur avec l'id ${id} bien mis à jour` });
        } else {
            res.status(404).json({ msg: "Auteur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour supprimer un auteur spécifique par ID
const removeAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await Authors.remove(id);
        if (affectedRows > 0) {
            res.json({ msg: `Auteur avec l'id ${id} bien supprimé` });
        } else {
            res.status(404).json({ msg: "Auteur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

export { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor };


