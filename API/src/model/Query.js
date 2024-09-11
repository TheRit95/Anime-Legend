import pool from "../config/db.js";

class Query {
    static async run(query) {

        try { 
          const [result] = await pool.query(query);
        return result;

    } catch (error) { 
        console.error("Error executing query:", error.message);

        throw new Error("Erreur lors de l'exécution de la requête");
    }

    }

    static async runWithParams(query, data) {
        try {
            const [result] = await pool.execute(query, Object.values(data));
        return result;

        } catch (error) {
            console.error("Error executing query with params:", error.message);
            
            throw new Error("Erreur lors de l'exécution de la requête avec paramètres");
        }
    }
        
    }


export default Query;