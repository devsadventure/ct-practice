const mysql = require('mysql');

const obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};
const pool = mysql.createPool(obj);
const sql = "update member set name=?, email=?, tel=? where id=?"; // 변경 필요한 요소 마지막에 쉼표를 넣으면 안됨!
const arr = ['홍길순', 'soon@bbb.com', '010-1111-2222', 'hong'];
pool.getConnection((err, conn) => {
    if (err) {
        console.log('err=', err);
        return;
    }
    conn.query(sql, arr, (err, row) => {
        if (err) {
            console.log('err=', err);
            return;
        }
        console.log('저장 완료');
        conn.release();
    });
});