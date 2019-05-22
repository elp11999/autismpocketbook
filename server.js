//
// Autism Pocket Book application
//
// server.js - Entry point to the Autism Pocket Book application
//

require('dotenv').config();

// Load Express libray
const express = require("express");

// Load Cookie parser library
const cookieParser = require('cookie-parser');

// Load Mongoose library
const mongoose = require("mongoose");

// Create express object
const app = express();

// Setup Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Setup location of static html content
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Load API Routes library
require("./routes/apiRoutes")(app);

// Set port to listen on
const PORT = process.env.PORT || 3001;

// Set Mongo DB URL
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/autismpocketbook";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Lets get the app going
app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

// Export the Express object
module.exports = app;