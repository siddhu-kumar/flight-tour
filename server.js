const http = require("http");
const fs = require("fs");
const path = require("path");

class HTTPServer {
  constructor(port, relativePath) {
    this.port = port;
    this.relativePath = relativePath;
    this.mimeType = {
      ".css": "text/css",
      ".html": "text/html",
      ".ico": "image/x-icon",
      ".js": "text/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".wav": "audio/wav",
      ".mp3": "audio/mpeg",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
      ".zip": "application/zip",
      ".doc": "application/msword",
      ".eot": "application/vnd.ms-fontobject",
      ".ttf": "application/x-font-ttf",
    };
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  start() {
    this.server.listen(this.port, "0.0.0.0", () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  handleRequest(req, res) {
    const ext = path.extname(req.url);
    if (!ext)
      switch (req.url) {
        case "/":
          this.serveFile(res, path.join(this.relativePath, "/src/html", "index.html"));
          break;
        default:
          this.serveFile(res, path.join(this.relativePath, "/src/html", "404page.html"));
      }
    else {
      switch (ext) {
        case ".html":
          this.serveFile(res, path.join(this.relativePath, "/src/html", req.url));
          break;
        case ".js":
          this.serveFile(res, path.join(this.relativePath, "/src/js", req.url));
          break;
        case ".css":
          this.serveFile(res, path.join(this.relativePath, "/src/css", req.url));
          break;
        case ".jpg":
        case ".png":
        case ".svg":
        case ".ico":
          this.serveFile(res, path.join(__dirname, "/src/assets", req.url));
          break;
      }
    }
  }

  serveFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", this.mimeType[path.extname(filePath)]);
      res.end(data);
    });
  }
}

const mainServer = new HTTPServer(3000, path.join(__dirname, ""));
mainServer.start();
