import Query from "../model/Query.js";

class Comments {
    // Méthode pour ajouter un commentaire via le controller comments
    static async addComment(data) {
        // Exécute une requête SQL pour insérer un nouveau commentaire avec les données fournies
        const response = await Query.runWithParams(
            "INSERT INTO comments (note, comment, users_id, animes_id) VALUES (?, ?, ?, ?)",
            data // Les données du commentaire à insérer sont passées sous forme de tableau
        );
        return response; // Retourne la réponse de l'insertion
    }

    // Méthode pour récupérer un commentaire spécifique par ID via le controller comments
    static async getCommentById(id) {
        // Requête SQL pour récupérer un commentaire spécifique et l'utilisateur associé, basé sur l'ID de l'anime
        const query = `
            SELECT
                comments.id, comments.note, comments.comment, comments.statut, comments.is_report,
                users.username
            FROM comments
            INNER JOIN users ON users.id = comments.users_id
            INNER JOIN animes ON animes.id = comments.animes_id
            WHERE animes.id = ? AND is_report = 0
        `;
        // Exécute la requête avec l'ID de l'anime passé en paramètre
        const response = await Query.runWithParams(query, [id]);
        return response; // Retourne la liste des commentaires associés à cet anime
    }

    // Méthode pour mettre à jour un commentaire spécifique par ID via le controller comments
    static async reportComment(id) {
        const response = await Query.runWithParams(
            `UPDATE comments SET is_report = 1
            WHERE id = ? `, 
            [id]
            
        )
        return response;
    
        // Requête SQL pour mettre à jour un commentaire existant en fonction de son ID
        
    }

    // Méthode pour supprimer un commentaire spécifique par ID via le controller comments
    static async removeComment(id) {
        // Requête SQL pour supprimer un commentaire en fonction de son ID
        const response = await Query.runWithParams(
            "DELETE FROM comments WHERE id = ?",
            [id] // L'ID du commentaire à supprimer est passé en paramètre
        );
        return response; // Retourne la réponse de la suppression
    }
};

export default Comments;
