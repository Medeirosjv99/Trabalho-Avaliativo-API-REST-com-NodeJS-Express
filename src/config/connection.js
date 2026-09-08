import mysql from "mysql2/promise";

const dbConfig = {
    host: "localhost",
    user: "root",
    database: "api",
    connectionLimit: 10
}

export const pool = mysql.createPool(dbConfig);

export const testConnection = async () => {
    try {        
        const conn = await pool.getConection();
        console.log("Conectado ao Mysql");
        conn.release();
    }
    catch(error){
        console.log("Erro ao conectar com o MySQL", error.message);
    }

}