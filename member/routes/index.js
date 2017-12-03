const express = require('express')
const router = express.Router()

const mysql = require('mysql')

let obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'member'
}

const pool = mysql.createPool(obj)

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  })
})

router.get('/writeform', (req, res, next) => {
  res.render('writeform', {
    title: 'Write Form'
  })
})

router.post('/write', (req, res, next) => {
  console.log('req.body=', req.body)
  const name = req.body.name
  const email = req.body.email
  const tel = req.body.tel
  const sql = "insert into member (name, email, tel) values (?,?,?)";
  const arr = [name, email, tel]
  pool.getConnection((err, conn) => {
    if (err) {
      console.log('err=', err)
      return
    }
    conn.query(sql, arr, (err, row) => {
      if (err) {
        console.log('err=', err)
        return
      }
      console.log('저장 완료')
      conn.release()
    })
  })
  res.send('OK')
})

module.exports = router;