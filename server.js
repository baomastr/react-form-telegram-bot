var http = require("http");
function accept(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache"
    });

    res.end("ok");
}

http.createServer(accept).listen(8080);