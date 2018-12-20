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

// Load models
const { User, List, Role, Movie } = require("./models/index");

// Respond to API GET calls - simple router
server.get(["/api/:route/", "/api/:route/:id"], (req, res) => {
  // We need the route and the id
  const { route, id } = req.params;
  switch (route) {
    case "users":
      if (id) {
        User.findAll({ where: { user_id: id } }).then(data => {
          res.json({ data, success: true });
        });
      } else {
        User.findAll().then(data => {
          res.json({ data, success: true });
        });
      }
      break;
    case "movie":
      if (id) {
        Movie.findAll({ where: { movie_id: id } }).then(data => {
          res.json({ data, success: true });
        });
      } else {
        Movie.findAll().then(data => {
          res.json({ data, success: true });
        });
      }
      break;
    case "list":
      if (id) {
        List.findAll({ where: { list_id: id } }).then(data => {
          res.json({ data, success: true });
        });
      } else {
        List.findAll().then(data => {
          res.json({ data, success: true });
        });
      }
      break;
  }
});

// POST calls
// Respond to API GET calls - simple router
server.post(["/api/:route/", "/api/:route/:id"], (req, res) => {
  const { route, id } = req.params;

  switch (route) {
    case "users":
      // TODO:: we should validate really
      if (id) {
        User.findOne(id).then(user => {
          user
            .update(req.body)
            .then(data => res.json({ data: [user], success: true }));
        });
      } else {
        const user = User.build(req.body);
        user.save().then(data => res.json({ data: [user], success: true }));
      }
      break;
    case "movie":
      if (id) {
      } else {
      }
      break;
    case "list":
      if (id) {
      } else {
      }
      break;
  }
});

// Reroute everything else to React app in client
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
server.listen(port, function() {
  const { address } = this.address();
  console.log(`Server started on host [${address}], port [${port}]`);
});
