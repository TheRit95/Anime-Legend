import pool from "../config/db.js";

class Query {
    // Méthode pour exécuter une requête SQL simple (sans paramètres)
    static async run(query) {
        try {
            // Exécute la requête SQL et retourne le résultat
            const [result] = await pool.query(query);
            return result;
        } catch (error) {
            // Si une erreur survient, elle est affichée dans la console et une exception est levée
            console.error("Error executing query:", error.message);
            throw new Error("Erreur lors de l'exécution de la requête");
        }
    }

    // Méthode pour exécuter une requête SQL avec des paramètres
    static async runWithParams(query, data) {
        try {
            // Exécute la requête SQL avec des paramètres et retourne le résultat
            const [result] = await pool.execute(query, Object.values(data));
            return result;
        } catch (error) {
            // Si une erreur survient lors de l'exécution de la requête avec paramètres, elle est affichée dans la console
            console.error("Error executing query with params:", error.message);
            throw new Error("Erreur lors de l'exécution de la requête avec paramètres");
        }
    }
}

export default Query;
