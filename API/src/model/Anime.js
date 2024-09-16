import Query from "../model/Query.js";

class Anime {

    static async getAll() {
        const response = await Query.run(`SELECT animes.id, title, description, genre, release_date, author_id, img_src, name AS author_name
        FROM animes JOIN authors ON authors.id = animes.author_id`);
        return response;
    }

    static async getOneById(id) {
        const anime = await Query.runWithParams(
            `SELECT bio, birthdate, animes.id, title, jap_title, description, genre, release_date, author_id, img_src, name AS author_name 
            FROM animes 
            JOIN authors 
            ON authors.id = animes.author_id WHERE animes.id = ?`,
            [id]
        );
        return anime;
    }
    
    static async add(data) {
        const response = await Query.runWithParams(
            "INSERT INTO animes (title, description, genre, release_date, author_id, img_src) VALUES (?, ?, ?, ?, ?, ?)",
            data
        );
        return response;
    }

    static async update(data) {
        const response = await Query.runWithParams(
            "UPDATE animes SET title = ?, description = ?, genre = ?, release_date = ?, author_id = ? WHERE id = ?",
            data
        );
        return response;
    }

    static async remove(id) {
        const response = await Query.runWithParams(
            "DELETE FROM animes WHERE id = ?",
            [id]
        );
        return response;
    }
};

export default Anime;
