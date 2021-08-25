const http = require("http");
const fs = require("fs");

const allfiles = fs.readdirSync("./", { withFileTypes: true });

const htmlfiles = allfiles
  .filter((entry) => {
    return /^.+\.(html|css)$/.test(entry.name);
  })
  .map((entry) => {
    if (entry.name.endsWith(".html")) {
      if (entry.name === "index.html") {
        return "";
      } else {
        return entry.name.slice(0, -5);
      }
    } else {
      return entry.name;
    }
  });

const server = http.createServer((req, res) => {
  const requestedUrl = req.url.slice(1);
  if (htmlfiles.includes(requestedUrl)) {
    if (requestedUrl.endsWith(".css")) {
      const cssf = fs.readFileSync("./" + requestedUrl, "utf8");
      res.setHeader("content-type", "text/css");
      res.end(cssf);
    } else {
      if (requestedUrl === "") {
        const file = fs.readFileSync("./index.html", "utf8");
        res.end(file);
      } else {
        const file = fs.readFileSync("./" + requestedUrl + ".html");
        res.end(file);
      }
    }
  } else {
    const file = fs.readFileSync("./404.html", "utf8");
    res.end(file);
  }
});
