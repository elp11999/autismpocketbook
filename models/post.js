//
// Autism Notebook Application
//
// post.js - Post Mongoose note schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Post database schema
var PostSchema = new Schema({
    // Title
    title: {
        type: String,
        required: true
    },
    // Author
    author: {
        type: String,
        required: true
    },
    // Post id
    pid: {
        type: String,
        required: true
    },
    // Data
    data: {
        type: String,
        required: true
    },
    // Post date
    postDate: {
        type: String,
        required: true
    }
});

// Create the Post model
var Post = mongoose.model("Post", PostSchema);

// Export the Parent model
module.exports = Post;