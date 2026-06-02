const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_DIR = __dirname;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method;

  // API: GET /api/data/:filename
  if (method === 'GET' && url.pathname.startsWith('/api/data/')) {
    const filename = url.pathname.replace('/api/data/', '');
    const filepath = path.join(DATA_DIR, filename);

    if (!filepath.startsWith(DATA_DIR)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found');
      }
      const ext = path.extname(filename);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end(data);
    });
    return;
  }

  // API: POST /api/data/:filename
  if (method === 'POST' && url.pathname.startsWith('/api/data/')) {
    const filename = url.pathname.replace('/api/data/', '');
    const filepath = path.join(DATA_DIR, filename);

    if (!filepath.startsWith(DATA_DIR)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      fs.writeFile(filepath, body, 'utf8', err => {
        if (err) {
          res.writeHead(500);
          return res.end('Write failed');
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ ok: true }));
      });
    });
    return;
  }

  // Static files
  let filepath = path.join(DATA_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
  const ext = path.extname(filepath);
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Shat Editor running at http://localhost:${PORT}`);
});
