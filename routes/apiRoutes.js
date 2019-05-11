//
// Autism Notebook Application
//
// apiRoutes.js - Parent Mongoose database schema
//


// Load Mongoose database schemas
const db = require("../models");

// Load Path library
var path = require("path");

// Express routes
module.exports = function(app) {

  /*
    // Route to get all books from database
    app.get("/api/books", function(req, res) {
        db.Book.find({})
          .then(function(dbBooks) {
            // Send books to client
            res.json(dbBooks);
          })
          .catch(function(err) {
            console.log("Find failed: " + err);
            // Send error to client 
            res.json(err);
          });
    });    

    // Route to add book to the database
    app.post("/api/books", function(req, res) {
      db.Book.create(req.body)
        .then(function(dbNote) {
            // Send "ok" to client 
            res.json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          res.json(err);
        });
    });

    // Route for removing a book from the database
    app.delete("/api/books/:id", function(req, res) {
      // Remove the book from database
      db.Book.deleteOne({ id: req.params.id })
        .then(function() {
          // Send a message to the client          
          res.json("ok");
        })
        .catch(function(err) {
          console.log("Remove failed:" + err);
          // Send error to client 
          res.json(err);
        });
    });
    */

    /*========================================================================*/  

    // Route to add parent to the database
    app.post("/api/parent", function(req, res) {
      db.Parent.create(req.body)
        .then(function(dbParent) {
            // Send "ok" to client 
            res.json("ok");
        })
        .catch(function(err) {
          // Send error to client 
          res.json(err);
        });
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
