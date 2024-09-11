import Query from "./Query.js"; // Assurez-vous que le chemin est correct

class Authors {

    // Méthode pour récupérer tous les auteurs
    static async getAll() {
        // Requête SQL pour sélectionner tous les auteurs, avec une jointure sur la table 'animes'
        const query = `
            SELECT
                authors.id, name, bio, birthdate
            FROM authors JOIN animes ON animes.id = author_id
        `;
        // Exécute la requête et récupère la réponse
        const response = await Query.run(query);
        
        // Retourner tous les auteurs récupérés
        return response;
    }

    // Méthode pour récupérer un auteur spécifique par ID
    static async getById(id) {
        // Requête SQL pour récupérer un auteur en fonction de son ID
        const query = `
            SELECT
                id, name, bio, birthdate
            FROM authors
            WHERE id = ?
        `;
        // Exécute la requête avec l'ID passé en paramètre
        const results = await Query.runWithParams(query, [id]);

        // Si un auteur est trouvé, le retourne, sinon retourne null
        return results.length > 0 ? results[0] : null;
    }

    // Méthode pour ajouter un nouvel auteur
    static async add({ name, bio, birthdate }) {
        // Requête SQL pour insérer un nouvel auteur avec les informations fournies
        const query = `
            INSERT INTO authors (name, bio, birthdate)
            VALUES (?, ?, ?)
        `;
        // Exécute la requête avec les données de l'auteur
        const result = await Query.runWithParams(query, [name, bio, birthdate]);
        
        // Retourne l'ID de l'auteur nouvellement ajouté
        return result.insertId;
    }

    // Méthode pour mettre à jour un auteur spécifique par ID
    static async update(id, { name, bio, birthdate }) {
        // Requête SQL pour mettre à jour un auteur en fonction de son ID
        const query = `
            UPDATE authors
            SET name = ?, bio = ?, birthdate = ?
            WHERE id = ?
        `;
        // Exécute la requête avec les nouvelles informations et l'ID de l'auteur à mettre à jour
        const result = await Query.runWithParams(query, [name, bio, birthdate, id]);
        
        // Retourne le nombre de lignes affectées par la mise à jour
        return result.affectedRows;
    }

    // Méthode pour supprimer un auteur spécifique par ID
    static async remove(id) {
        // Requête SQL pour supprimer un auteur en fonction de son ID
        const query = `
            DELETE FROM authors
            WHERE id = ?
        `;
        // Exécute la requête avec l'ID de l'auteur à supprimer
        const result = await Query.runWithParams(query, [id]);
        
        // Retourne le nombre de lignes affectées par la suppression
        return result.affectedRows;
    }
}

export default Authors;
