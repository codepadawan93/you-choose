// Load environment variables
const env = require("dotenv").load();

// Load dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");

const server = express();
const port = process.env.PORT || 8080;

// Use the body parser and cookie middleware
server.use(bodyParser.json());

// Serve static assets from ./client
server.use(express.static(path.join(__dirname, "client/build")));

// Load Models (User, Role, List, ListItem, Movie)
const models = require("./models/index");

// Create routers for all Models
const routers = [
  {
    route: "/api/users",
    pkColumn: "user_id",
    modelName: "User"
  },
  {
    route: "/api/roles",
    pkColumn: "role_id",
    modelName: "Role"
  },
  {
    route: "/api/lists",
    pkColumn: "list_id",
    modelName: "List"
  },
  {
    route: "/api/list_items",
    pkColumn: "list_item_id",
    modelName: "ListItem"
  },
  {
    route: "/api/movies",
    pkColumn: "movie_id",
    modelName: "Movie"
  }
];

routers.forEach(routerObject => {
  // Build the necessary column name
  const { modelName, route, pkColumn } = routerObject;
  
  const router = express.Router();
  // A GET to the root of a resource returns a list of that resource
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
    if (modelName === "Movie") {
      // Check if we don't have this movie yet. If we do serve that
      models[modelName]
        .findOne({ where : { tmdb_guid : req.body.tmdb_guid }})
        .then(data => {
          if(data){
            res.json({ data: [data], success: true })
          } else {
            modelInstance
              .save()
              .then(data => res.json({ data: [modelInstance], success: true }))
              .catch(err => res.json({ err, success: false }));
          }
        })
        .catch(e => res.json({ e, success: false }));
    } else {
      modelInstance
        .save()
        .then(data => res.json({ data: [modelInstance], success: true }))
        .catch(err => res.json({ err, success: false }));
    }
  });

  // We specify a param in our path for the GET of a specific object
  router.get("/:id", (req, res) => {
    models[modelName]
      .findOne({ where: { [pkColumn]: req.params.id } })
      .then(data => {
        if (!data) {
          res.json(404, { data: [], success: false });
          return;
        }
        res.json({ data: [data], success: true });
      });
  });

  // Similar to the GET on an object, to update it we can PATCH
  router.patch("/:id", (req, res) => {
    models[modelName]
      .findOne({ where: { [pkColumn]: req.params.id } })
      .then(modelInstance => {
        if (!modelInstance) {
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
    models[modelName]
      .findOne({ where: { [pkColumn]: req.params.id } })
      .then(data => {
        if (!data) {
          res.json(404, { data: [], success: false });
          return;
        }
        
        if (modelName === "List") {
          // Delete children
          models.ListItem
            .destroy({where: {list_id : req.params.id}});
        }
        data
          .destroy()
          .then(() => res.json({ data: [data], success: true }));
      })
      .catch(err => res.json({ err, success: false }));
  });

  // Attach the routers for their respective paths
  server.use(route, router);
});

// Allow auth at this endpoint
server.post("/api/authenticate", (req, res) => {
  const { user_name, password } = req.body;
  if(user_name && password){
    const { User } = models;
    User
      .findOne({ where: {user_name: user_name}})
      .then(data => {
        if(data){
          bcrypt.compare(password, data.password).then(match => {
            if(match){
              // Not secure, not good, not anything.. but works? sure 
              const sessionId = bcrypt.hashSync(data.user_id + data.user_name + data.role + new Date().getTime(), 0);
              data.session_id = sessionId;
              data.save();
              res
                .cookie('api_token', sessionId)
                .json(200, {success: true, message: "Successfully logged in"});
            } else {
              res.json(401, { success: false, message: "Unauthorized" });
            }
          });
        }else{
          res.json(404, { success: false, message: "User not found" });
        }
      })
      .catch(e => res.json(500, { success: false, message:e.toString() }));
  } else {
    res.json(400, {success : false, message:"Bad request"});
  }
});

// Request auth here
server.get("/api/authenticate/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const { User } = models;
  User
    .findOne({ where: { session_id: sessionId } })
    .then(data => {
      if(data){
        const {user_id, user_name, firstname, lastname, role_id} = data;
        res.json(200, { success: true, data: {user_id, user_name, firstname, lastname, role_id} });
      } else {
        res.json(301, { success: false, goto: "/api/authenticate", method: "POST" });
      }
    })
    .catch(e => res.json(500, {success : false, message:"Internal server error"}));
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
