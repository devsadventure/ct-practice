var express = require('express');
var router = express.Router();
/* 
// http://localhost:5000/
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
//   res.render('ejs 파일명', JSON);
});
 */
router.get('/', (req, res, next) => {
  var exJson = { title: 'Node.js' };
  res.render('index.ejs', exJson);
  //   res.render('ejs 파일명', JSON);
});

// http://localhost:5000/abc
router.get('/abc', (req, res, next) => {
  res.send('여기는 /abc 입니다');
});

module.exports = router;