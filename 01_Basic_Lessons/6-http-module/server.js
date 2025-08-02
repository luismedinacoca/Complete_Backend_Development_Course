const http = require('http');

const server = http.createServer( (req, res) => {
  console.log("req", req);
  /**
   * Without res.writeHead and res.end => browser continues reloading
   */
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello node js from http module');
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server is now listening to port ${port}`);
})

/**
 * After running 
 * $ node server.js
 * 
 * Do not forget to open browser with "http://localhost:3000"
 * Check out what happend in terminal right after that!
 * 
 * https://nodejs.org/api/http.html
 */