// Start here - building and linking backend (APIs) to front-end, 12 steps total
// 1. Create regular Express simple server
const path = require('path');
const express = require('express'); // old way to do import dependencies
const dotenv = require('dotenv'); // to get global variables in config files
const colors = require('colors'); // color codes console
const morgan = require('morgan'); // for logging
const connectDB = require('./config/db'); // bringing in database

dotenv.config({ path: './config/config.env'}); // set up config file to get variables

connectDB(); // call func to make connection to DB

// bring router file in
const transactions = require('./routes/transactions');

const app = express(); // init express app

app.use(express.json()); // allows us to use the body parser when sending data from client

// use morgan just to see what requests being made
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions); // mount the router
// making a request to /api/v1/transactions will route to router.get inside transactions.js file

// Go below API routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // for any route load the index.html, its the entry point
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
    // * means any path, when making a request to anything except our API routes, will load the index.html file
}

// create a route in file
app.get('/', (req, res) => {
    res.send("Hello World!");
})

// process.env is how to access global variables (like system.env in Java)
const PORT = process.env.PORT || 5000;

// to be able to run the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});


