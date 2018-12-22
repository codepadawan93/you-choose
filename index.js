// Load environment variables
const env = require("dotenv").load();

// Load dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");

const server = express();
const port = process.env.PORT || 8080;

// Use the body parser middleware
server.use(bodyParser.json());

// Serve static assets from ./client
server.use(express.static(path.join(__dirname, "client/build")));

// Load Models (User, Role, List, ListItem, Movie)
const models = require("./models/index");

// Create routers for all Models
const routers = [
  {
    route: "/api/users",
    modelName: "User"
  },
  {
    route: "/api/roles",
    modelName: "Role"
  },
  {
    route: "/api/lists",
    modelName: "List"
  },
  {
    route: "/api/list_items",
    modelName: "ListItem"
  },
  {
    route: "/api/movies",
    modelName: "Movie"
  }
];

routers.forEach(routerObject => {
  // A GET to the root of a resource returns a list of that resource
  const { modelName, route } = routerObject;
  const pkColumn = modelName.toLowerCase() + "_id";
  const findOneQuery = {};

  const router = express.Router();
  router.get("/", function(req, res) {
    models[modelName].findAll().then(data => {
      if (!data) {
        res.json(404, { data: [], success: false });
        return;
      }
      res.json({ data, success: true });
    });
  });

  // A POST to the root of a resource should create a new object
  router.post("/", (req, res) => {
    const modelInstance = models[modelName].build(req.body);
    if (modelName === "User") {
      const hash = bcrypt.hashSync(
        modelInstance.password,
        process.env.SALT_ROUNDS || 5
      );
      modelInstance.password = hash;
    }
    modelInstance
      .save()
      .then(data => res.json({ data: [modelInstance], success: true }))
      .catch(err => res.json({ err, success: false }));
  });

  // We specify a param in our path for the GET of a specific object
  router.get("/:id", (req, res) => {
    findOneQuery[pkColumn] = req.params.id;
    models[modelName].findOne({ where: findOneQuery }).then(data => {
      if (!data) {
        res.json(404, { data: [], success: false });
        return;
      }
      res.json({ data: [data], success: true });
    });
  });

  // Similar to the GET on an object, to update it we can PATCH
  router.patch("/:id", (req, res) => {
    findOneQuery[pkColumn] = req.params.id;
    models[modelName].findOne({ where: findOneQuery }).then(modelInstance => {
      if (!data) {
        res.json(404, { data: [], success: false });
        return;
      }
      modelInstance
        .update(req.body)
        .then(data => res.json({ data: [modelInstance], success: true }))
        .catch(err => res.json({ err, success: false }));
    });
  });

  // Delete a specific object
  router.delete("/:id", (req, res) => {
    findOneQuery[pkColumn] = req.params.id;
    models[modelName]
      .findOne({ where: findOneQuery })
      .delete()
      .then(data => {
        if (!data) {
          res.json(404, { data: [], success: false });
          return;
        }
        res.json({ data: [modelInstance], success: true });
      })
      .catch(err => res.json({ err, success: false }));
  });

  // Attach the routers for their respective paths
  server.use(route, router);
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
