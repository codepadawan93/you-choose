const server = require('express')();

server.get('*', (req, res) => {
    res.end("Hello world");
});

server.listen(8080, function(){
    console.log("Server started on host [%s], port [%s]", this.address().address, this.address().port);
});