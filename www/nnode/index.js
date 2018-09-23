let http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello\n");
}).listen(8124);

console.log("Работа сервера на порте 8124");