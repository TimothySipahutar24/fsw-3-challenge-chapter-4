const http = require("http");
const { PORT = 3000 } = process.env;

const fs = require("fs");
const path = require("path");
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
  return fs.readFileSync(htmlFilePath, "utf-8");
}

function getCSS(cssFileName) {
  const cssFilePath = path.join(PUBLIC_DIRECTORY, cssFileName);
  return fs.readFileSync(cssFilePath, "utf-8");
}

function getJavascript(javascriptFileName) {
  const javascriptFilePath = path.join(PUBLIC_DIRECTORY, javascriptFileName);
  return fs.readFileSync(javascriptFilePath, "utf-8");
}

function getImageJPG(imageFileName) {
  const imageFilePath = path.join(PUBLIC_DIRECTORY, imageFileName);
  return fs.readFileSync(imageFilePath);
}

function getImagePNG(imageFileName) {
  const imageFilePath = path.join(PUBLIC_DIRECTORY, imageFileName);
  return fs.readFileSync(imageFilePath);
}

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

function onRequest(req, res) {
  let cssFile,
    javascriptFile,
    jpgFile,
    pngFile = "";
  if (req.url.match(".css$")) {
    cssFile = req.url;
  } else if (req.url.match(".js$")) {
    javascriptFile = req.url;
  } else if (req.url.match(".jpg$")) {
    jpgFile = req.url;
  } else if (req.url.match(".png$")) {
    pngFile = req.url;
  }

  switch (req.url) {
    case "/":
      console.log(req.url);
      res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
      res.end(getHTML("index.html"));
      return;
    case "/cars":
      console.log(req.url);
      res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
      res.end(getHTML("cars.html"));
      return;
    case cssFile:
      res.writeHead(200, { "Content-Type": mimeTypes[".css"] });
      res.end(getCSS(cssFile));
      return;
    case javascriptFile:
      res.writeHead(200, { "Content-Type": mimeTypes[".js"] });
      res.end(getJavascript(javascriptFile));
      return;
    case jpgFile:
      res.writeHead(200, { "Content-Type": mimeTypes[".jpg"] });
      res.end(getImageJPG(jpgFile));
      return;
    case pngFile:
      res.writeHead(200, { "Content-Type": mimeTypes[".png"] });
      res.end(getImagePNG(pngFile));
      return;
    default:
      res.writeHead(404, { "Content-Type": mimeTypes[".html"] });
      res.end("Page not Found!");
      return;
  }
}

const server = http.createServer(onRequest);

server.listen(PORT, "0.0.0.0", () => {
  console.log("server sudah berjalan, silahkan buka http://localhost:%d", PORT);
});
