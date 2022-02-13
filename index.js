// Express Framework 
const express = require('express');
const app = express();
// Database
const mongoose = require('mongoose');

//Validation
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Routes import
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

//DataBase connection
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


// Routes
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

//Server connection
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));