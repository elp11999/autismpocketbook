//
// Autism Notebook Application
//
// parent.js - Parent Mongoose database schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Parent database schema
var ParentSchema = new Schema({
    // User name
    username: {
        type: String,
        required: true,        
        unique: true    // Make id be a unique key
    },
    // Email address
    email: {
        type: String,
        required: true,        
        unique: true    // Make id be a unique key
    },
    // Password
    password: {
        type: String,
        required: true
    }
});

// Create the Parent model
var Parent = mongoose.model("Parent", ParentSchema);

// Export the Parent model
module.exports = Parent;
