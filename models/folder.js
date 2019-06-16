//
// Autism Notebook Application
//
// folder.js - Folder Mongoose note schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Note database schema
var FolderSchema = new Schema({
    // Title
    title: {
        type: String,
        required: true
    },
    // Description
    description: {
        type: String,
        required: true
    },
    // Folder id
    fid: {
        type: String,
        required: true
    },
    // Number of topicss
    topicCount: {
        type: String,
        required: true
    },
    // Number of replies
    replyCount: {
        type: String,
        required: true
    },
    // Last post date
    lastPost: {
        type: String,
        required: true
    }, 
    // Set up a topics assocation
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic"
      }
    ]
});

// Create the Note model
var Folder = mongoose.model("Folder", FolderSchema);

// Export the Parent model
module.exports = Folder;