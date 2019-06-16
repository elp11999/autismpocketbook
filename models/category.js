//
// Autism Notebook Application
//
// category.js - Category Mongoose Schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Category database schema
var CategorySchema = new Schema({
    // Title
    title: {
        type: String,
        required: true
    },
    // ID
    cid: {
        type: Number,
        required: true
    }, 
    // Set up a folders assocation
    folders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Folder"
      }
    ]
});

// Create the Category model
var Category = mongoose.model("Category", CategorySchema);

// Export the Category model
module.exports = Category;