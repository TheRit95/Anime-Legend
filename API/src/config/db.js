import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables d'environnement depuis le fichier .env

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
    .then((res) => {
        console.log("Connected to the database: " + res.config.database);
        pool.releaseConnection(res);
    })
    .catch((err) =>
        console.error("Error while connecting to the database: " + err.message)
    );

export default pool;
