const server = require('express')();

server.get('*', (req, res) => {
    res.end("Hello world");
});

server.listen(8080, () => {
    console.log("Server started on port 8080");
});