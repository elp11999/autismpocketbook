//
// Autism Notebook Application
//
// note.js - Parent Mongoose note schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Note database schema
var NoteSchema = new Schema({
    // Title
    title: {
        type: String,
        required: true
    },
    // Start date
    start: {
        type: String,
        required: true
    },
    // All day
    allDay: {
        type: Boolean,
        required: true
    },
    // Mood
    mood: {
        type: String,
        required: true
    },
    // Sleep
    sleep: {
        type: String,
        required: true
    },
    // Nutrition
    nutrition: {
        type: Array,
        required: true
    },
    // Behavior
    behavior: {
        type: Array,
        required: true
    },
    // Sensory regulation
    sensoryregulation: {
        type: String,
        required: true
    },
    // Exercise
    exercise: {
        type: String,
        required: true
    },
    // Weather
    weather: {
        type: String,
        required: true
    },
    // Notes
    notes: {
        type: String,
        required: true
    }
});

// Create the Note model
var Note = mongoose.model("Note", NoteSchema);

// Export the Parent model
module.exports = Note;