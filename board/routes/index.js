var express = require('express');
var router = express.Router();

const mysql = require('mysql');

const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
};
const pool = mysql.createPool(obj);

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/writeform', (req, res, next) => {
  res.render('writeform', { title: 'Write it Down' });
});

router.post('/write', (req, res, next) => {
  console.log('req.body=', req.body);
  const writer = req.body.writer;
  const pwd = req.body.pwd;
  const subject = req.body.subject;
  const content = req.body.content;
  const sql = "insert into board (writer, pwd, subject, content) values (?,?,?,?)";
  const arr = [writer, pwd, subject, content];
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
  res.send('OK');
})

module.exports = router;