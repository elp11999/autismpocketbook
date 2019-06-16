/*
  {
      category: "AutsimPocketBook.com",
      cid: 0,
      folders : [        
        {
          title: 'AutismPocketBook News',
          description: 'Website news and updates are posted here.',
          tid: 0,
          topics: '40',
          replies: 15,
          lastPost: '08-11-2018 07:12:46 a.m.'
        }
      ]
  }
  */
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
        type: String,
        required: true
    },
    // Folders
    folders: {
        type: Array,
        required: true
    }
});

// Create the Category model
var Category = mongoose.model("Category", CategorySchema);

// Export the Category model
module.exports = Category;