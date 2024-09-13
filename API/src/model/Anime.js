import Query from "../model/Query.js";

class Anime {

    // Méthode pour récupérer tous les animes via le controller animes
    static async getAll() {
        // Exécute une requête SQL pour sélectionner tous les animes avec leurs auteurs associés
        
        const response = await Query.run(`SELECT animes.id, title, description, genre, release_date, author_id, img_src, name AS author_name
        FROM animes JOIN authors ON authors.id = animes.author_id`); // Exécute la requête et retourne la réponse
        return response;
    }

    // Méthode pour récupérer un anime spécifique par ID via le controller animes
    static async getOneById(id) {
        // Exécute une requête SQL pour sélectionner un anime spécifique et son auteur en fonction de l'ID fourni
        const anime = await Query.runWithParams(
            `SELECT bio, birthdate, animes.id, title, description, genre, release_date, author_id, img_src, name AS author_name 
            FROM animes 
            JOIN authors 
            ON authors.id = animes.author_id WHERE animes.id = ?`,
            [id] // Le paramètre 'id' est passé dans la requête pour filtrer par ID
        );
        return anime;
    }
    
    // Méthode pour ajouter un nouvel anime via le controller animes
    static async add(data) {
        // Exécute une requête SQL pour insérer un nouvel anime avec les données fournies
        const response = await Query.runWithParams(
            "INSERT INTO animes (title, description, genre, release_date, author_id, img_src) VALUES (?, ?, ?, ?, ?, ?)",
            data // Les données à insérer sont passées sous forme de tableau
        );
        return response;
    }

    // Méthode pour mettre à jour un anime spécifique par ID via le controller animes
    static async update(data) {
        // Exécute une requête SQL pour mettre à jour un anime existant en fonction de son ID
        const response = await Query.runWithParams(
            "UPDATE animes SET title = ?, description = ?, genre = ?, release_date = ?, author_id = ? WHERE id = ?",
            data // Les nouvelles valeurs et l'ID de l'anime sont passés sous forme de tableau
        );
        return response;
    }

    // Méthode pour supprimer un anime spécifique par ID via le controller animes
    static async remove(id) {
        // Exécute une requête SQL pour supprimer un anime en fonction de son ID
        const response = await Query.runWithParams(
            "DELETE FROM animes WHERE id = ?",
            [id] // L'ID de l'anime à supprimer est passé en paramètre
        );
        return response;
    }
};

export default Anime;
