import Query from "../model/Query.js";

class Admin {

  static async  userBan(id) {

    const response = await Query.runWithParams(`
        UPDATE users SET statut = 0 
        WHERE id = ?`,[id]

    )
    return response;

  }

  static async  commentPublish(id) {

    const response = await Query.runWithParams(`
        UPDATE comments SET is_report = 0
        WHERE id = ?`,[id]

    )
    return response;

  }

  static async  commentDelete(id) {

    const response = await Query.runWithParams(`
        DELETE FROM comments 
        WHERE id = ?`,[id]

    )
    return response;


  }

  static async  getAllReport() {

    const response = await Query.run(`
        SELECT username, users.id, comment, comments.id 
        FROM comments 
        JOIN users 
        ON users.id = comments.users_id
        WHERE is_report = 1`

    )
    return response;


  }
};




export default Admin;