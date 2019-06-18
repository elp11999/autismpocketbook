//
// Autism Notebook Application
//
// apiRoutes.js - Express routes
//

// Load Child Process library
const { exec } = require('child_process');

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
const secret = process.env.TOKEN_SECRET;

// Express routes
module.exports = function(app) {

    // Route to add parent to the database
    app.post("/api/parent", function(req, res) {
      const { username, email, password } = req.body;
      const parent = new Parent({ username, email, password });
      parent.save(function(err) {
        if (err) {
          console.log("New parent not added!!! err=" + err);
          let errCode = err.code;
          switch (err.code) {
            case 11000:
              errorMessage = "Email address already defined.";
              break;
            default:
                errorMessage = "Create user failed. Error=" + err.code;
              break;
          }
          console.log(errorMessage);
          res.status(200).json({pid: username, error: errorMessage});
        } else { 
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h',
          }); 
          console.log(parent);    
          res.cookie('token', token, { httpOnly: true }).status(200).json({pid: parent._id, error: null});
        }
      });
    });
    
    // Route to authenticate user
    app.post("/api/authenticate", function(req, res) {
      const { email, password } = req.body;
      db.Parent.findOne({ email }, function(err, user) {
        if (err) {
          res.status(200).json({pid: null, error: 'Internal error please try again'});
        } else if (!user) {
          res.status(200).json({pid: null, error: 'Incorrect email address'});
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              res.status(200).json({pid: null, error: 'Internal error please try again'});
            } else if (!same) {
              res.status(200).json({pid: null, error: 'Incorrect password'});
            } else {
              // Issue token
              const payload = { email };
              const token = jwt.sign(payload, secret, {
                expiresIn: '1h',
              }); 
              console.log(user);          
              res.cookie('token', token, { httpOnly: true }).status(200).json({pid: user._id});
            }
          });
        }
      });
    });   

    // Route to authenticate
    app.get("/api/authenticate", withAuth, function(req, res) {
      res.status(200).send();
    }); 

    // Route to add child to the database
    app.post("/api/child/:id", function(req, res) {
      console.log("adding a new child...");
      let firstname = "";
      db.Child.create(req.body)
        .then(function(dbChild) {
          // Save child's name
          name = dbChild.firstname;
          // Save child's id
          cid = dbChild._id;
          
          // Update parent with new child
          return db.Parent.findOneAndUpdate({ _id: req.params.id}, { $push: { children: dbChild._id } }, { new: true });            
        })
        .then(function(dbParent) {
          // Send "ok" to client;            
          res.status(200).json({cid: cid, child: name});
        })
        .catch(function(err) {
          // Send error to client 
          console.log("Error creating child err=" + err);
          res.json(err);
        });
    });

    // Route to update child to the database
    app.post("/api/updatechild/:id", function(req, res) {
      console.log("updating a child id=" + req.params.id);
      db.Child.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }, { new: true })
        .then(function(dbNote) {
          // Send "ok" to client;  
          console.log("Child Update good...");          
          res.status(200).json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          console.log("oops... Did not Update a Child...");
          console.log(err);
          res.json(err);
        });
    });

    // Route to add note to the database
    app.post("/api/note/:id", function(req, res) {
      db.Note.create(req.body)
        .then(function(dbNote) {          
          // Update Child with new Note
          return db.Child.findOneAndUpdate({ _id: req.params.id}, { $push: { notes: dbNote._id } }, { new: true });            
        })
        .then(function(dbChild) {
          // Send "ok" to client;            
          res.status(200).json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          console.log("oops... Did not create a Note...");
          console.log(err);
          res.json(err);
        });
    });

    // Route to update note to the database
    app.post("/api/updatenote/:id", function(req, res) {
      db.Note.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }, { new: true })
        .then(function(dbNote) {
          // Send "ok" to client;  
          console.log("Note Update good...");          
          res.status(200).json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          console.log("oops... Did not Update a Note...");
          console.log(err);
          res.json(err);
        });
    });   

    // Route to a parent child count
    app.get("/api/getchildrencount/:id", function(req, res) {
      console.log("getchildrencount parms=" + req.params.id);
      // Find Parent by id
      db.Parent.findOne({ _id: req.params.id })
        .then(function(dbParent) {
          console.log(dbParent);
          // Get children count
          let count = dbParent.children.length;
          res.status(200).json({count: count});
        })
        .catch(function(err) {
          // Send error
          console.log(err);
          res.json(err);
        });
    });    

    // Route to get all childrens from database
    app.get("/api/getchildren/:id", function(req, res) {
      console.log("getchildren parms=" + req.params.id);
      // Find Parent by id
      db.Parent.findOne({ _id: req.params.id })
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
      console.log("getnotes parms=" + req.params.id);
      // Find child by id
      db.Child.findOne({ "_id": req.params.id })
        // Get all notes for the child
        .populate("notes")
        .then(function(dbChild) {
          // Return just the notes for the child
          //console.log(dbChild);
          let response = {
            child: dbChild.firstname,
            notes: dbChild.notes
          }
          res.json(response);
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

    // Route to get a single child note based on start date from database
    app.post("/api/getnote/:id", function(req, res) {
      console.log("getnote parms=" + req.params.id);
      console.log(req.body);
      // Find child by id
      db.Child.findOne({ _id: req.params.id })
        // Get all notes for the child
        .populate("notes", null, { "start": req.body.date })
        .then(function(dbChild) {
          // Return just the notes for the child
          console.log(dbChild.notes);
          res.json(dbChild.notes);
        })
        .catch(function(err) {
          // Send error
          console.log(err);
          res.json(err);
        });
    });

    // Route to start demo
    app.post("/api/demo", function(req, res) {
      console.log("Demo: started...");
      if (process.env.NODE_ENV === "production") {
        res.status(200).json({message: "Demo not available in production mode..."});
      } else {
        res.status(200).json({message: "Demo is now loading. Please wait..."});
        exec('demo.bat', (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
        });
        console.log("Demo done!!!");
      }
    });  

    // Route to get all forum categories
    app.get("/api/getcategories", function(req, res) {
      db.Category.find()
        // Get all notes for the child
        .populate("folders")
        .then(function(dbCategories) {
          console.log(dbCategories);
          res.json(dbCategories);
        })
        .catch(function(err) {
          // Send error
          console.log(err);
          res.json(err);
        });
    });    

    // Use default react app if no api routes
    app.use(function(req, res){
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });  
};
