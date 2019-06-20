//
// Autism Notebook Application
//
// index.js - Mongoose database exports
//

module.exports = {
    Parent: require("./parent"),
    Child: require("./child"),
    Note: require("./note"),    
    Category: require("./category"),    
    Folder: require("./folder"),   
    Topic: require("./topic"),      
    Post: require("./post")
};