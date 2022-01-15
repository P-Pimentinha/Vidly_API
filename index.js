const express = require('express');
const app = express();
const Joi = require('joi');
const movies = require('./routes/routes');

app.use(express.json());
app.use('/api/movies/', movies);


//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`)); 

