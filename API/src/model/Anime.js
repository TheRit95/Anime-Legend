import Query from "../model/Query.js";

class Anime {
  static async getAll() {
    const response =
      await Query.run(`SELECT animes.id, title, jap_title, description, genre, release_date, author_id, img_src, name AS author_name
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

  static async update(data, animeId) {
    try {
      const response = await Query.runWithParams(
        "UPDATE animes SET title = ?, jap_title = ?, description = ?, genre = ?, release_date = ?  WHERE id = ?",
        [
          data.title,
          data.jap_title,
          data.description,
          data.genre,
          data.release_date,
          animeId,
        ]
      );
      const author = await Query.runWithParams(
        "UPDATE authors SET name = ?  WHERE id = ?",
        [data.author_name, data.author_id]
      );
      console.log(animeId);
      return [response, author];
    } catch (error) {}
  }

  static async remove(id) {
    const response = await Query.runWithParams(
      "DELETE FROM animes WHERE id = ?",
      [id]
    );
    return response;
  }
}

export default Anime;
