//Express
const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const authorBooks = require('./routes/books')

const posRouter = require('./routes/pos')

app.set("view engine", "ejs")
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
//app.use(express.urlencoded({ extended: true }))
//app.use(express.json())

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', authorBooks)

app.use('/pos', posRouter)

//const userRouter = require("./routes/users")

//app.use("/users", userRouter)

app.listen(process.env.PORT || 3000)

/*
const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3000

http.createServer((req, res) => {
  const filePath = __dirname + (req.url === '/' ? '/index.html' : req.url)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end(JSON.stringify(err))
      return
    }
    res.writeHead(200)
    res.end(data)
  })
}).listen(port)
*/
/*
var http = require('http');
var fs = require('fs');

const PORT=80; 

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});

*/
/*
var http = require("http"),
url = require("url"),
path = require("path"),
fs = require("fs")
port = process.argv[2] || 80,
mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "svg": "image/svg+xml",
  "json": "application/json",
  "js": "text/javascript",
  "css": "text/css"
};

http.createServer(function(request, response) {

var uri = url.parse(request.url).pathname, 
  filename = path.join(process.cwd(), uri);

fs.exists(filename, function(exists) {
if(!exists) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("404 Not Found\n");
  response.end();
  return;
}

if (fs.statSync(filename).isDirectory()) 
  filename += '/index.html';

fs.readFile(filename, "binary", function(err, file) {
  if(err) {        
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(err + "\n");
    response.end();
    return;
  }
  
  var mimeType = mimeTypes[filename.split('.').pop()];
  
  if (!mimeType) {
    mimeType = 'text/plain';
  }
  
  response.writeHead(200, { "Content-Type": mimeType });
  response.write(file, "binary");
  response.end();
});
});
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
*/