require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const promisePool = pool.promise();

async function executeQuery(sql, params) {
    try {
        const [results, fields] = await promisePool.query(sql, params);
        return results;
    } catch (error) {
        console.error('SQL error: ', error);
        throw error;
    }
}

module.exports = { executeQuery };
