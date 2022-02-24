// Express Framework 
const express = require('express');
const app = express();
require('express-async-errors');
// Database
const mongoose = require('mongoose');

//Validation
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Routes/middleware import
const error = require('./middleware/error');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivatekey is not defined')
    process.exit(1);
}

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
app.use('/api/users', users);
app.use('/api/auth', auth);

//Express error handling middleware
app.use(error);

//Server connection
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));