const http = require("http");
const fs = require("fs");
const path = require("path");

class HTTPServer {
  constructor(port, htmlDir) {
    this.port = port;
    this.htmlDir = htmlDir;
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  start() {
    this.server.listen(this.port, "0.0.0.0", () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  handleRequest(req, res) {
    if (req.url === "/") {
      this.serveFile(res, path.join(this.htmlDir, "index.html"));
    } else if (req.url === "/payment") {
      this.serveFile(res, path.join(this.htmlDir, "/payment", "index.html"));
    } else if (req.url === "/home") {
      this.serveFile(res, path.join(this.htmlDir, "/home", "index.html"));
    } else if (req.url === "/profile") {
      this.serveFile(res, path.join(this.htmlDir, "/profile", "index.html"));
    } else if (
      req.url.endsWith(".js") ||
      req.url.endsWith(".css") ||
      req.url.endsWith(".ico")
    ) {
      this.serveFile(res, path.join(this.htmlDir, "payment.html"));
    } else {
      this.serveFile(res, path.join(this.htmlDir, "pageNotExists.html"));
    }
  }

  serveFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Unsupported request");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
}

const mainServer = new HTTPServer(3000, path.join(__dirname, ""));
mainServer.start();
