// Importation du modèle Authors pour interagir avec la base de données des auteurs
import Authors from "../model/Authors.js";

// Fonction pour récupérer tous les auteurs
const getAllAuthors = async (_req, res) => {
    try {
        // Récupère tous les auteurs de la base de données en utilisant la méthode getAll()
        const authors = await Authors.getAll();

        // Envoie la liste des auteurs en réponse au client
        res.json(authors);
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour récupérer un auteur spécifique par ID
const getAuthorById = async (req, res) => {
    // Extraction de l'ID de l'auteur à partir des paramètres de la requête
    const { id } = req.params;

    try {
        // Récupère un auteur par son ID en utilisant la méthode getById()
        const author = await Authors.getById(id);

        if (author) {
            // Si l'auteur est trouvé, renvoie les données de l'auteur
            res.json(author);
        } else {
            // Si l'auteur n'est pas trouvé, renvoie un code 404 avec un message
            res.status(404).json({ msg: "Auteur non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour ajouter un nouvel auteur
const addAuthor = async (req, res) => {
    // Extraction des données envoyées dans le corps de la requête
    const { name, bio, birthdate } = req.body;

    // Vérifie que tous les champs obligatoires sont fournis
    if (!name || !bio || !birthdate) {
        return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    try {
        // Ajout d'un nouvel auteur en utilisant la méthode add()
        const authorId = await Authors.add({ name, bio, birthdate });

        // Renvoie un message de succès avec l'ID du nouvel auteur
        res.json({ msg: `Auteur bien ajouté avec l'id ${authorId}` });
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour mettre à jour un auteur spécifique par ID
const updateAuthor = async (req, res) => {
    // Extraction de l'ID de l'auteur à partir des paramètres de la requête
    const { id } = req.params;
    // Extraction des données envoyées dans le corps de la requête
    const { name, bio, birthdate } = req.body;

    // Vérifie que tous les champs obligatoires sont fournis
    if (!name || !bio || !birthdate) {
        return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    try {
        // Mise à jour de l'auteur en utilisant la méthode update()
        const affectedRows = await Authors.update(id, { name, bio, birthdate });

        if (affectedRows > 0) {
            // Si l'auteur est trouvé et mis à jour, renvoie un message de succès
            res.json({ msg: `Auteur avec l'id ${id} bien mis à jour` });
        } else {
            // Si l'auteur n'est pas trouvé, renvoie un code 404 avec un message
            res.status(404).json({ msg: "Auteur non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Fonction pour supprimer un auteur spécifique par ID
const removeAuthor = async (req, res) => {
    // Extraction de l'ID de l'auteur à partir des paramètres de la requête
    const { id } = req.params;

    try {
        // Suppression de l'auteur en utilisant la méthode remove()
        const affectedRows = await Authors.remove(id);

        if (affectedRows > 0) {
            // Si l'auteur est trouvé et supprimé, renvoie un message de succès
            res.json({ msg: `Auteur avec l'id ${id} bien supprimé` });
        } else {
            // Si l'auteur n'est pas trouvé, renvoie un code 404 avec un message
            res.status(404).json({ msg: "Auteur non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le code 500 et un message d'erreur
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
};

// Export des fonctions pour les utiliser dans d'autres parties de l'application
export { getAllAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor };
