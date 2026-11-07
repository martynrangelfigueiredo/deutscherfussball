const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".smc": "application/octet-stream",
  ".sfc": "application/octet-stream",
  ".ips": "application/octet-stream",
  ".zip": "application/zip",
};

const server = http.createServer((req, res) => {
  const safePath = decodeURIComponent(req.url.split("?")[0]);
  const relPath = safePath === "/" ? "/index.html" : safePath;
  const filePath = path.join(ROOT, relPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Not Found");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "Cache-Control": "public, max-age=3600",
    });

    if (req.method === "HEAD") {
      return res.end();
    }

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
