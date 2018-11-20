// Load environment variables
const env = require('dotenv').load();

// Load Express
const server = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// Use the body parser middleware
server.use(bodyParser.json());

// Respond to requests
server.get('*', (req, res) => {
    console.log(req.body);
    res.json({message: "Hello World", success: true});
});

// Start the server
server.listen(port, function(){
    const { address } = this.address();
    console.log(`Server started on host [${address}], port [${port}]`);
});