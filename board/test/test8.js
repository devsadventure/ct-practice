const mysql = require('mysql');

// JSON 형태
const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};

const pool = mysql.createPool(obj);

pool.getConnection((err, conn) => {
    if (err) {
        console.log('err=', err);
        return;
    }
    conn.query('SELECT 1 + 1 as solution', (err, rows) => {
        if (err) {
            console.log('err=', err);
            return;
        }
        console.log('rows=', rows);
        const a = rows[0];
        console.log('rows=', a);
        console.log('row.solution=', a.solution);
        conn.release();

    });
});