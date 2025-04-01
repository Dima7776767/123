// Минимальный HTTP-сервер на чистом Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Маршрутизация
  if (req.url === '/') {
    serveFile(res, 'views/index.html', 'text/html');
  } 
  else if (req.url === '/style.css') {
    serveFile(res, 'public/style.css', 'text/css');
  }
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function serveFile(res, filePath, contentType) {
  const fullPath = path.join(__dirname, filePath);
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading file');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});