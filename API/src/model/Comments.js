import Query from "../model/Query.js";

class Comments {
  static async addComment(data) {
    const response = await Query.runWithParams(
      "INSERT INTO comments (note, comment, users_id, animes_id) VALUES (?, ?, ?, ?)",
      data
    );
    return response;
  }

  static async getCommentById(id) {
    const query = `
            SELECT
                comments.id, comments.note, comments.comment, comments.statut, comments.is_report,
                users.username
            FROM comments
            INNER JOIN users ON users.id = comments.users_id
            INNER JOIN animes ON animes.id = comments.animes_id
            WHERE animes.id = ? AND is_report = 0
        `;
    const response = await Query.runWithParams(query, [id]);
    return response;
  }

  static async reportComment(id) {
    const response = await Query.runWithParams(
      `UPDATE comments SET is_report = 1
            WHERE id = ?`,
      [id]
    );
    return response;
  }

  static async removeComment(id, users_id) {
    const response = await Query.runWithParams(
      `DELETE FROM comments WHERE id = ? 
             AND users_id = ?`,
      [id, users_id]
    );
    return response;
  }
}

export default Comments;
