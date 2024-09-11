import Query from "../model/Query.js";

class Anime {

    // Méthode pour récupérer tous les animes via le controller animes
    static async getAll() {
        // Requête SQL pour récupérer tous les animes, incluant le nom de l'auteur via une jointure avec la table 'authors'
        const query = `SELECT animes.id, title, description, genre, release_date, author_id, img_src, name AS author_name
        FROM animes JOIN authors ON authors.id = animes.author_id`;
        
        // Exécution de la requête et récupération de la réponse
        const response = await Query.run(query);
        
        // Retourner tous les animes récupérés
        return response;
    }

    // Méthode pour récupérer un anime spécifique par ID via le controller animes
    static async getOneById(id) {
        // Requête SQL pour récupérer un anime et les informations sur l'auteur en fonction de l'ID de l'anime
        const anime = await Query.runWithParams(
            `SELECT bio, birthdate, animes.id, title, description, genre, release_date, author_id, img_src, name AS author_name 
            FROM animes 
            JOIN authors 
            ON authors.id = animes.author_id WHERE animes.id = ?`,
            [id] // Paramètre utilisé pour spécifier l'anime à récupérer
        );
        
        // Retourner l'anime spécifique récupéré
        return anime;
    }
    
    // Méthode pour ajouter un nouvel anime via le controller animes
    static async add(data) {
        // Requête SQL pour insérer un nouvel anime dans la base de données
        const response = await Query.runWithParams(
            "INSERT INTO animes (title, description, genre, release_date, author_id, img_src) VALUES (?, ?, ?, ?, ?, ?)",
            data // Les données du nouvel anime (titre, description, etc.) sont passées sous forme de tableau
        );
        
        // Retourner la réponse de l'insertion (ex. ID de l'anime inséré)
        return response;
    }

    // Méthode pour mettre à jour un anime spécifique par ID via le controller animes
    static async update(data) {
        // Requête SQL pour mettre à jour les informations d'un anime existant
        const response = await Query.runWithParams(
            "UPDATE animes SET title = ?, description = ?, genre = ?, release_date = ?, author_id = ? WHERE id = ?",
            data // Les nouvelles informations de l'anime (titre, description, etc.) et l'ID de l'anime à mettre à jour
        );
        
        // Retourner la réponse de la mise à jour
        return response;
    }

    // Méthode pour supprimer un anime spécifique par ID via le controller animes
    static async remove(id) {
        // Requête SQL pour supprimer un anime en fonction de son ID
        const response = await Query.runWithParams(
            "DELETE FROM animes WHERE id = ?",
            [id] // L'ID de l'anime à supprimer est passé en paramètre
        );
        
        // Retourner la réponse de la suppression
        return response;
    }
};

export default Anime;
