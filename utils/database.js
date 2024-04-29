const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'yourUsername',  
    password: 'yourPassword', 
    database: 'employee_tracker'
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
