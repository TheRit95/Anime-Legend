import Query from "./Query.js"; 

class Authors {

    static async getAll() {
        const query = `
            SELECT
                authors.id, name, bio, birthdate
            FROM authors JOIN animes ON animes.id = author_id
        `;
        const response = await Query.run(query);
        return response;
    }

    static async getById(id) {
        const query = `
            SELECT
                id, name, bio, birthdate
            FROM authors
            WHERE id = ?
        `;
        const results = await Query.runWithParams(query, [id]);
        return results.length > 0 ? results[0] : null;
    }

    static async add({ name, bio, birthdate }) {
        const query = `
            INSERT INTO authors (name, bio, birthdate)
            VALUES (?, ?, ?)
        `;
        const result = await Query.runWithParams(query, [name, bio, birthdate]);
        return result.insertId;
    }

    static async update(id, { name, bio, birthdate }) {
        const query = `
            UPDATE authors
            SET name = ?, bio = ?, birthdate = ?
            WHERE id = ?
        `;
        const result = await Query.runWithParams(query, [name, bio, birthdate, id]);
        return result.affectedRows;
    }

    static async remove(id) {
        const query = `
            DELETE FROM authors
            WHERE id = ?
        `;
        const result = await Query.runWithParams(query, [id]);
        return result.affectedRows;
    }
};

export default Authors;
