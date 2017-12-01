var express = require('express');
var router = express.Router();

const mysql = require('mysql');

let obj = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
};
const pool = mysql.createPool(obj);

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/writeform', (req, res, next) => {
    res.render('writeform', {
        title: 'Write it Down'
    });
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
});

// http://localhost:3000/list : get 방식
router.get('/list', (req, res, next) => {
    // res.send("여기는 list입니다");
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err)
        }
        const sql =
            `SELECT num,
            subject,
            writer,
            DATE_FORMAT(regdate, '%Y-%c-%d %T') as regdate,
            hit
            FROM board
            ORDER BY num DESC`
        const arr = [];
        conn.query(sql, arr, (err, rows) => {
            console.log('rows=', rows);
            conn.release();
            let obj = {
                "title": "게시판 리스트",
                "rows": rows
            }
            // res.json(obj); // 모바일 서버
            res.render('list', obj); // 웹 서버
        })
    });
});

router.get('/read/:num', (req, res, next) => {
    let num = req.params.num;
    console.log('num=', num);
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err)
        }
        let update_sql = "update board set hit = hit + 1 where num=?";
        let arr = [num];
        conn.query(update_sql, arr, (err, result) => {
            if (err) {
                return next(err);
            }
            console.log('result=', result)
            let sql = "SELECT * FROM board WHERE num=?";
            let arr = [num];
            conn.query(sql, arr, (err, rows) => {
                if (err) {
                    return next(err)
                }
                console.log('rows=', rows);
                conn.release();
                let obj = {
                    title: "게시판 글 읽기",
                    row: rows[0]
                };
                res.render('read', obj)
            });
        });

    });
});
router.get('/updateform/:num', (req, res, next) => {
    let num = req.params.num;
    res.json({
        num: num
    });
});

module.exports = router;