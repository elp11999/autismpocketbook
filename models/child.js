//
// Autism Notebook Application
//
// child.js - Child Mongoose database schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Create Child database schema
var ChildSchema = new Schema({
    // First name
    firstname: {
        type: String,
        required: true
    },
    // Middle name
    middlename: {
        type: String,
        required: true
    },
    // Last name
    lastname: {
        type: String,
        required: true
    },
    // Age
    age: {
        type: String,
        required: true
    },
    // Date of birth
    dob: {
        type: String,
        required: true
    },
    // Primary care provider
    primarycareprovider: {
        type: String,
        required: true
    },
    // Interventions
    primarycareprovider: {
        type: String,
        required: true
    },
    // Medication 1
    med1: {
        type: String
    },
    // Medication 1 frequency
    freq1: {
        type: String
    },
    // Medication 1 dosage
    dos1: {
        type: String
    },
    // Medication 2
    med2: {
        type: String
    },
    // Medication 2 frequency
    freq2: {
        type: String
    },
    // Medication 2 dosage
    dos2: {
        type: String
    },
    // Medication 3
    med3: {
        type: String
    },
    // Medication 3 frequency
    freq3: {
        type: String
    },
    // Medication 3 dosage
    dos3: {
        type: String
    },
    // Medication 4
    med4: {
        type: String
    },
    // Medication 4 frequency
    freq4: {
        type: String
    },
    // Medication 4 dosage
    dos4: {
        type: String
    },
    // Medication 5
    med5: {
        type: String
    },
    // Medication 5 frequency
    freq5: {
        type: String
    },
    // Medication 5 dosage
    dos5: {
        type: String
    },
    // Medication 6
    med6: {
        type: String
    },
    // Medication 6 frequency
    freq6: {
        type: String
    },
    // Medication 6 dosage
    dos6: {
        type: String
    },
    // Medication 7
    med7: {
        type: String
    },
    // Medication 7 frequency
    freq7: {
        type: String
    },
    // Medication 7 dosage
    dos7: {
        type: String
    },
    // Medication 8
    med8: {
        type: String
    },
    // Medication 8 frequency
    freq8: {
        type: String
    },
    // Medication 8 dosage
    dos8: {
        type: String
    },
    // Medication 9
    med9: {
        type: String
    },
    // Medication 9 frequency
    freq9: {
        type: String
    },
    // Medication 9 dosage
    dos9: {
        type: String
    },
    // Medication 10
    med10: {
        type: String
    },
    // Medication 10 frequency
    freq10: {
        type: String
    },
    // Medication 10 dosage
    dos10: {
        type: String
    },
    // Autism level
    autsimlevel: {
        type: String,
        required: true
    },
    // Cofactors
    cofactors: {
        type: String,
        required: true
    },
    // School accomodations
    schoolaccomodations: {
        type: String,
        required: true
    }
});

// Create the Child model
var Child = mongoose.model("Child", ChildSchema);

// Export the Child model
module.exports = Child;
