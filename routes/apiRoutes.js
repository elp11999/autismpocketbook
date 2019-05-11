//
// Autism Notebook Application
//
// apiRoutes.js - Parent Mongoose database schema
//

// Load Mongoose database schemas
const db = require("../models");
const Parent = require('../models/parent.js');
const withAuth = require("../withAuth");

// Load Path library
const path = require("path");

// Load web token library
const jwt = require('jsonwebtoken');

// Set token password
const secret = 'mysecretsshhh';

// Express routes
module.exports = function(app) {

    // Route to add parent to the database
    app.post("/api/parent", function(req, res) {
      const { username, email, password } = req.body;
      const parent = new Parent({ username, email, password });
      parent.save(function(err) {
        if (err) {
          res.status(500).send("Error registering new user please try again.");
        } else {
          res.status(200).send("ok");
        }
      });
    });
    
    // Route to authenticate user
    app.post("/api/authenticate", function(req, res) {
      const { email, password } = req.body;
      db.Parent.findOne({ email }, function(err, user) {
        if (err) {
          res.status(500).json({error: 'Internal error please try again'});
        } else if (!user) {
          res.status(401).json({error: 'Incorrect email or password'});
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(500).json({error: 'Internal error please try again'});
            } else if (!same) {
              res.status(401).json({error: 'Incorrect email or password'});
            } else {
              // Issue token
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h',
              });
              res.cookie('token', token, { httpOnly: true }).sendStatus(200);
            }
          });
        }
      });
    });   

    // Route to add child to the database
    app.get("/api/authenticate", withAuth, function(req, res) {
      res.status(200).send();
    }); 

    // Route to add child to the database
    app.post("/api/child", function(req, res) {
      db.Child.create(req.body)
        .then(function(dbChild) {
            // Send "ok" to client 
            res.json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          res.json(err);
        });
    });

    // Route to add note to the database
    app.post("/api/note", function(req, res) {
      db.Note.create(req.body)
        .then(function(dbNote) {
            // Send "ok" to client 
            res.json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          console.log("oops... Did not create a Note...");
          res.json(err);
        });
    });

    // Use default react app if no api routes
    app.use(function(req, res){
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });   
};
