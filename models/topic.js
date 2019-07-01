//
// Autism Notebook Application
//
// topic.js - Topic Mongoose note schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Topic database schema
var TopicSchema = new Schema({
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
    // Folder id
    fid: {
        type: String,
        required: true
    },
    // Number of replies
    replyCount: {
        type: Number,
        required: true
    },
    // Number of views
    viewCount: {
        type: Number,
        required: true
    },
    // Last updated by
    lastUpdateBy: {
        type: String,
        required: false
    },
    // Last post date
    lastPost: {
        type: String,
        required: true
    }, 
    // Set up a posts assocation
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
});

// Create the Note model
var Topic = mongoose.model("Topic", TopicSchema);

// Export the Parent model
module.exports = Topic;