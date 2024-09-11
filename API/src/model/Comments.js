import Query from "../model/Query.js";

class Comments {
    // ajouter un commentaire le controllers comments
    static async addComment (data) {
        const response = await Query.runWithParams(
            "INSERT INTO comments (note, comment, statut, user_id, anime_id) VALUES (?, ?, ?, ?, ?)",
            data
        );
        
        return response;
    }
    // Ajouter un nouveau commentaire via le controlers comments
    static async getCommentById(id) {
        const query = `
            SELECT
                comments.id, comments.note, comments.comment, comments.statut,
                users.username
            FROM comments
            INNER JOIN users ON users.id = comments.users_id
            INNER JOIN animes ON animes.id = comments.animes_id
            WHERE animes.id = ?
        `;
        const response = await Query.runWithParams(query, [id])
        return response;
    }
    // Mettre à jour un commentaire spécifique par ID via controllers comments

    static async updateComment (data) {
        const response = await Query.runWithParams(
            "UPDATE comments SET note = ?, comment = ?, statut = ?, user_id = ?, anime_id = ? WHERE id = ?",
            data
        );
        return response;
    }
    // Supprimer un commentaire spécifique par ID via controllers comments

    static async removeComment (id) {
        const response = await Query.runWithParams(
            "DELETE FROM comments WHERE id = ?",
            [id]
        );
        return response;
    }
};



export default Comments;