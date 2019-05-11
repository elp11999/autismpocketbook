//
// Autism Notebook Application
//
// parent.js - Parent Mongoose database schema
//

// Load mongoose library
var mongoose = require("mongoose");

// Load bcrypt library
var bcrypt = require('bcrypt');

// Get reference to the Mongoose Schema constructor
var Schema = mongoose.Schema;

// Set number of salt rounds
const saltRounds = 10;

// Create Parent database schema
var ParentSchema = new Schema({
    // User name
    username: {
        type: String,
        required: true
    },
    // Email address
    email: {
        type: String,
        required: true
    },
    // Password
    password: {
        type: String,
        required: true
    }
});

// Set unique indexes
ParentSchema.index({ username: 1, email: 1 }, { unique: true});

// Set function to encrypt password
ParentSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// Set function to validate password
ParentSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
}

// Create the Parent model
var Parent = mongoose.model("Parent", ParentSchema);

// Export the Parent model
module.exports = mongoose.model('Parent', ParentSchema);

