// connecting the mongoose and mongodb 
// Required the Library
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://localhost/todoapp_development');

//Acquire the connection to check if it is Successfull
const db = mongoose.connection;

// If Error
db.on('error', console.error.bind(console, "Error connecting to Databse"));

// Define Function on my db
// If up & running then print the message in cosole
db.once('open',function(){
    console.log('Successfully connected to the database');
});
//Exporting Module
module.exports = db;