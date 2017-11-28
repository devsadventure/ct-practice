const http = require('http');
/* 1. 불변 */
const hostname = '127.0.0.1';
const port = 3000;

/* 2. arrow function 람다표현식 */
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}/`);
  /* 3. 백쿼트 (`)
  console.log("Server running at http://" + hostname + ":" port); 
  +가 너무 많이 생기는 불편한 분제가 생겨서, 백쿼트(`)를 쓰면서
  위에 선언했던 변수를 사용한다. string을 만들 때 +로 만드는 불편함을 해소하기 위함.
   */
});