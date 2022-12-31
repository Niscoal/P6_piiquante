const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Initialisation du projet 6");
});

server.listen(process.env.PORT || 3000);
