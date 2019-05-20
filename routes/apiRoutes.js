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

// Import the Word Definition library
const wd = require('word-definition');

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
          console.log("New parent not added!!! err=" + err);
          res.status(500).send("Error registering new user please try again.");
        } else { 
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h',
          });
          res.cookie('token', token, { httpOnly: true }).status(200).json({parent: username});
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
              res.cookie('token', token, { httpOnly: true }).status(200).json({parent: user.username});
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
    app.post("/api/child/:id", function(req, res) {
      let firstname = "";
      db.Child.create(req.body)
        .then(function(dbChild) {
          // Save name of child
          firstname = dbChild.firstname;
          
          // Update parent with new child
          return db.Parent.findOneAndUpdate({ username: req.params.id}, { $push: { children: dbChild._id } }, { new: true });            
        })
        .then(function(dbParent) {
          // Send "ok" to client;            
          res.status(200).json({child: firstname});
        })
        .catch(function(err) {
          // Send error to client 
          console.log("Error creating child err=" + err);
          res.json(err);
        });
    });

    // Route to add note to the database
    app.post("/api/note/:id", function(req, res) {
      db.Note.create(req.body)
        .then(function(dbNote) {          
          // Update Child with new Note
          return db.Child.findOneAndUpdate({ firstname: req.params.id}, { $push: { notes: dbNote._id } }, { new: true });            
        })
        .then(function(dbChild) {
          // Send "ok" to client;            
          res.status(200).json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          console.log("oops... Did not create a Note...");
          res.json(err);
        });
    });    

    // Route to get all childrens from database
    app.get("/api/getchildren/:id", function(req, res) {
      console.log("getchildren parms=" + req.params.id);
      // Find Parent by id
      db.Parent.findOne({ username: req.params.id })
        // Get all the children
        .populate("children")
        .then(function(dbParent) {
          // Return just the children
          //console.log(dbParent);
          res.json(dbParent.children);
        })
        .catch(function(err) {
          // Send error
          console.log(err);
          res.json(err);
        });
    });     

    // Route to get all child notes from database
    app.get("/api/getnotes/:id", function(req, res) {
      //console.log("getnotes parms=" + req.params.id);
      // Find child by id
      db.Child.findOne({ firstname: req.params.id })
        // Get all notes for the child
        .populate("notes")
        .then(function(dbChild) {
          // Return just the notes for the child
          //console.log(dbChild);
          res.json(dbChild.notes);
        })
        .catch(function(err) {
          // Send error
          console.log(err);
          res.json(err);
        });
    });  

    // Route to get word definition
    app.get("/api/getdefinition/:id", function(req, res) {
      wd.getDef(req.params.id, "en", null, function(definition) {
        res.json(definition);
      });
    }); 

    // Use default react app if no api routes
    app.use(function(req, res){
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });   
};
