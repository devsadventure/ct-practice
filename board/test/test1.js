var mysql = require('mysql');
var obj = {
    host: 'localhost',
    user: 'jeesoohong',
    password: '',
    database: 'test'
}
var connection = mysql.createConnection(obj);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();