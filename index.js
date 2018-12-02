// Load environment variables
const env = require("dotenv").load();

// Load dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const server = express();
const port = process.env.PORT || 8080;

// Use the body parser middleware
server.use(bodyParser.json());

// Serve static assets from ./client
server.use(express.static(path.join(__dirname, "client/build")));

// Respond to API calls
server.get("/api/:route", (req, res) => {
  console.log(req.params.route);
  console.log(req.body);
  res.json({ message: "Hello World", success: true });
});

// Reroute everything else to React app in client
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
server.listen(port, function() {
  const { address } = this.address();
  console.log(`Server started on host [${address}], port [${port}]`);
});
